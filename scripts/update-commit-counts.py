"""Refresh commit totals from each listed repository's default branch."""
import concurrent.futures
import json
from pathlib import Path
import re
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]

def count_commits(slug):
    request = Request(
        f'https://api.github.com/repos/veckdev/{slug}/commits?per_page=1',
        headers={'Accept': 'application/vnd.github+json', 'User-Agent': 'veck-portfolio'},
    )
    with urlopen(request, timeout=30) as response:
        data = json.load(response)
        last = re.search(r'[?&]page=(\d+)>; rel="last"', response.headers.get('Link', ''))
        return slug, int(last[1]) if last else len(data)

def badge(count):
    label = f'{count} commits on the default branch'
    return f'<sup class="commit-count" title="{label}" aria-label="{label}">{count}</sup>'

def main():
    listing = (ROOT / 'projects.html').read_text()
    slugs = re.findall(r'<h2><a href="projects/([^"/]+)\.html">', listing)
    # Fetch all totals before writing; an API failure preserves the previous values.
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        totals = dict(pool.map(count_commits, slugs))
    for slug, total in totals.items():
        pattern = r'(<h2><a href="projects/' + re.escape(slug) + r'\.html">)(.*?)(</a></h2>)'
        def update(match):
            title = re.sub(r'\s*<sup class="commit-count".*?</sup>', '', match[2])
            title = title.replace(' <span aria-hidden="true">→</span>', '')
            return match[1] + title + ' ' + badge(total) + match[3]
        listing, matched = re.subn(pattern, update, listing)
        assert matched == 1, slug
        path = ROOT / 'projects' / f'{slug}.html'
        page = path.read_text()
        def update_heading(match):
            title = re.sub(r'\s*<sup class="commit-count".*?</sup>', '', match[1])
            return '<h1>' + title + ' ' + badge(total) + '</h1>'
        page = re.sub(r'<h1>(.*?)</h1>', update_heading, page, count=1)
        path.write_text(page)
    (ROOT / 'projects.html').write_text(listing)
    print(json.dumps(totals, indent=2))

if __name__ == '__main__':
    main()
