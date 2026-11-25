# Swap Item

**My oat drink sold out while the order was being picked. One tap took the swap.**

![Swap Item preview](preview.gif)

**Live demo:** [veraetogrex-portfolio.github.io/swap-item](https://veraetogrex-portfolio.github.io/swap-item/) · **Mockup:** [full-screen version](https://veraetogrex-portfolio.github.io/swap-item/mockup/swap-item.html)

A grocery order screen: the sold-out item and the picker's suggested replacement side by side, Accept replacement slides the new carton into the order list as Replacement confirmed and the total drops by the difference. Vanilla HTML/CSS/JS, zero dependencies.

## Try it

- Press Review replacement on the home screen. Order #48217 opens: the faded Barista Oat Drink marked "Out of stock" ($3.49) stands next to the picker's pick, Oat Drink, No Added Sugar ($3.29, −$0.20), with Dana's note.
- Press Accept replacement. The green carton slides onto the faded one in 0.6 s, then the same carton shrinks into the first row of "In the bag" while the list rises into the place of the choice.
- The row reads "Replacement confirmed" with $3.29, the bag counts 14 → 15 of 18, the total drops from $64.18 to $63.98 with "Replacements 1 · −$0.20", the chat shows "Accepted, thank you!" and a "Still to pick" list of 3 items opens below. Press Accept several times mid-animation — the swap happens once.
- Home and Orders in the sidebar switch between the two screens; the answer stays in the order.
- Keyboard: Tab to Review replacement or Accept replacement and press Enter; arrow keys switch the "If something is out of stock" option.
- With reduced motion on, nothing slides: the carton, the row and the list jump to their places.

## Use it

Three files and the photos, no build step, no dependencies:

```
index.html   markup
style.css    styles
script.js    logic
assets/      the photos (generated, free to reuse with the code)
```

Download the repo and open `index.html`, or copy the files into your project. Set `data-assets` on `<section class="vm">` to the folder with your photos.

## License

MIT
