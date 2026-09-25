# Portfolio Site

Personal portfolio at [veck.dev](https://veck.dev), built with HTML, CSS, and JavaScript.

## Pages

- `index.html`: introduction, education, and internship interests.
- `projects.html`: public project catalogue with skills and repository links.
- `projects/`: individual project pages covering the problem, implementation, and skills in practice.
- `style.css` and `script.js`: shared appearance and persistent system/light/dark theme controls.

## Preview locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. No build step or dependencies are required.

## Updating projects

The catalogue is a curated snapshot of the public repositories at https://github.com/veckdev, reviewed on 25 September 2026. It does not call the GitHub API at runtime. When adding a project, update `projects.html` and add its detail page in `projects/`, keeping descriptions and skills grounded in the repository. The `veckdev` repository is linked separately as the profile README.

Keep the narrow layout, typography, and theme controls consistent across pages. Verify relative links from the nested detail pages and check both desktop and mobile layouts before publishing.
