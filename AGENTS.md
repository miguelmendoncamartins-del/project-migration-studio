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
- Original character sheets in public/game/pixel-sprites mirror the reference categories and filenames; each sheet has idle on the left and attack on the right, loaded by sprite-assets.js instead of reference portraits.
