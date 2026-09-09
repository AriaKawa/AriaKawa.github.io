// Interaction masks trace the buildings in the 1536 × 1024 camp artwork.
// The highlighted layer reuses the original pixels; no colored hotspot plate.
const buildings = [
  { id: 'armor', name: 'Convoy bay', x: 410, y: 410, path: 'M158 233 L207 221 L215 194 L237 163 L269 133 L303 110 L339 94 L374 84 L407 82 L443 87 L481 98 L519 114 L550 135 L579 165 L612 183 L655 194 L656 216 L649 218 L650 274 L674 282 L675 310 L656 320 L627 318 L614 335 L582 338 L574 364 L550 380 L513 382 L489 372 L478 360 L450 350 L421 351 L407 378 L375 389 L347 380 L327 371 L307 362 L285 366 L264 357 L260 342 L234 341 L225 329 L201 329 L181 317 L177 271 L157 259 Z' },
  { id: 'turrets', name: 'Turret workshop', x: 1110, y: 454, path: 'M882 278 L933 256 L931 221 L970 216 L1012 207 L1051 191 L1091 171 L1138 175 L1188 187 L1240 208 L1287 231 L1318 246 L1318 274 L1347 281 L1382 289 L1377 309 L1355 318 L1358 347 L1378 351 L1391 367 L1389 391 L1369 398 L1347 399 L1328 410 L1303 409 L1285 398 L1248 397 L1236 422 L1249 435 L1244 451 L1222 458 L1193 449 L1177 435 L1166 407 L1140 405 L1128 418 L1097 425 L1064 416 L1043 421 L1019 410 L1007 398 L978 395 L956 384 L946 378 L920 381 L898 368 L879 366 L865 349 L873 330 L881 317 Z' },
  { id: 'field', name: 'Field upgrades', x: 314, y: 767, path: 'M67 546 L106 531 L155 508 L213 485 L254 466 L269 474 L310 492 L350 509 L397 532 L401 549 L435 536 L456 526 L479 543 L508 551 L542 560 L563 552 L572 556 L570 578 L562 583 L563 630 L585 639 L587 663 L574 680 L554 684 L550 698 L521 706 L491 695 L473 711 L454 718 L434 713 L420 723 L400 720 L383 710 L355 713 L327 727 L300 735 L283 726 L259 728 L236 712 L224 699 L201 706 L181 702 L158 688 L137 684 L123 670 L104 670 L95 651 L73 647 L62 630 L61 601 L70 592 Z' },
  { id: 'market', name: 'Player market', x: 1148, y: 855, path: 'M834 593 L863 587 L894 592 L930 578 L961 565 L997 550 L1028 524 L1065 522 L1101 513 L1139 504 L1173 490 L1187 500 L1224 514 L1266 523 L1293 537 L1299 550 L1333 567 L1361 579 L1396 585 L1410 587 L1395 604 L1368 625 L1371 642 L1402 657 L1436 669 L1442 682 L1431 689 L1436 715 L1452 727 L1450 749 L1436 756 L1412 758 L1404 778 L1375 789 L1350 785 L1333 771 L1304 780 L1287 802 L1255 811 L1228 822 L1194 822 L1176 811 L1150 809 L1119 823 L1087 831 L1069 819 L1046 823 L1029 812 L1007 808 L982 818 L958 815 L941 803 L918 796 L906 776 L883 765 L883 742 L861 729 L854 707 L832 697 L822 680 L827 654 L836 645 Z' }
];

export function campMap(): string {
  return `<div class="camp-map camp-map-traced" aria-label="Base camp">
    <img src="./assets/hideout-camp.png" alt="A fortified base camp with four workshops">
    <svg class="camp-interactions" viewBox="0 0 1536 1024" aria-label="Choose a building">
      <defs>${buildings.map(b => `<clipPath id="camp-mask-${b.id}"><path d="${b.path}"/></clipPath>`).join('')}</defs>
      ${buildings.map(b => `<g class="camp-location" data-tab="${b.id}" role="button" tabindex="0" aria-label="${b.name}">
        <image class="camp-lit" href="./assets/hideout-camp.png" width="1536" height="1024" clip-path="url(#camp-mask-${b.id})"/>
        <path class="camp-hit" d="${b.path}"/>
        <text x="${b.x}" y="${b.y}" class="camp-label" text-anchor="middle">${b.name}</text>
      </g>`).join('')}
    </svg>
  </div>`;
}
