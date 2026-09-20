const paths:Record<string,string>={
person:'<circle cx="13" cy="6" r="4" fill="currentColor"/><path d="M5 23v-7a8 8 0 0 1 16 0v7M9 22v-7m8 7v-7"/>',
select:'<path d="M6 3v17l4-5 4 7 3-2-4-7 6-1Z"/>',
pan:'<path d="M8 12V6a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v7-5a2 2 0 0 1 4 0v9c0 5-3 8-7 8-3 0-4-2-6-4l-4-5a2 2 0 0 1 3-3l2 2"/>',
erase:'<path d="m4 13 9-10 8 7-10 11H8L3 16Z"/><path d="m8 9 8 7M11 21h11"/>',
undo:'<path d="m8 4-6 6 6 6M3 10h12a6 6 0 0 1 0 12"/>',
redo:'<path d="m16 4 6 6-6 6m5-6H9a6 6 0 0 0 0 12"/>',
flag:'<path d="M6 23V3l13 2v10L6 13"/>',
play:'<path d="m7 3 15 10-15 10Z" fill="currentColor"/>',
stop:'<rect x="5" y="5" width="16" height="16" rx="1" fill="currentColor"/>',
save:'<path d="M4 3h15l4 4v16H3V3Z"/><path d="M8 3v7h10V3M7 23v-9h12v9"/>',
menu:'<path d="M4 6h18M4 13h18M4 20h18"/>',
dice:'<rect x="3" y="3" width="20" height="20" rx="4"/><path d="M8 8h.01M18 8h.01M13 13h.01M8 18h.01M18 18h.01" stroke-width="4"/>',
trash:'<path d="M4 6h18M9 6V3h8v3M6 6l1 17h12l1-17M10 10v9M16 10v9"/>',
copy:'<rect x="8" y="8" width="15" height="15" rx="2"/><path d="M17 8V3H3v14h5"/>',
tune:'<path d="M4 7h18M4 19h18"/><circle cx="9" cy="7" r="3"/><circle cx="17" cy="19" r="3"/>',
fly:'<path d="M13 14 2 7c1 7 4 10 9 9l2 7 2-7c5 1 8-2 9-9Z"/><circle cx="13" cy="6" r="3"/>',
retry:'<path d="m3 4 1 8 8-1M4 10a10 10 0 1 1 0 9"/>',
focus:'<path d="M9 3H3v6m14-6h6v6M3 17v6h6m14-6v6h-6"/><circle cx="13" cy="13" r="3"/>',
home:'<path d="m3 12 10-9 10 9M6 10v13h14V10M11 23v-8h4v8"/>',
grid:'<rect x="3" y="3" width="20" height="20"/><path d="M3 10h20M3 17h20M10 3v20M17 3v20"/>'
};
export const icon=(name:string)=>'<svg viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]??'')+'</svg>';
