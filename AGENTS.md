<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The imported Phaser game lives as static files in public/game and is shown full-screen from the home page; edit gameplay there, not in React, to preserve the original game structure.
- Character animation strips live in public/game/pixel-sprites/animations with category/name/idle, walk and special PNGs using four fixed cells; sprite-assets.js loads them with legacy two-pose fallback to prevent neighboring-frame bleed.
- Share animation selection, joystick normalization and screen-size detection through animation-rules.js so desktop and touch controls use the same gameplay actions and testable rules.
