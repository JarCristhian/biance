import React from "react";

interface SvgIcons {
  [key: string]: string;
}

const svgIcons: SvgIcons = {
  down: `
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.66 16.01a1.35 1.35 0 0 1-.47.54c-.203.13-.439.2-.68.2h-13a1.3 1.3 0 0 1-.69-.2a1.28 1.28 0 0 1-.56-1.25a1.27 1.27 0 0 1 .31-.65l6.09-6.77a1.7 1.7 0 0 1 .58-.45a1.8 1.8 0 0 1 .73-.18c.253.003.503.05.74.14c.23.101.438.247.61.43l6.11 6.83c.163.182.267.408.3.65a1.24 1.24 0 0 1-.07.71"/></svg>
    `,
  img: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v14H5V5zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-4.86 8.86l-3 3.87L9 13.14L6 17h12z"/></svg>
    `,
  edit: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="m6 21l-.19-3.025C5.372 10.944 10.956 5 18 5l-1.217.974A10.08 10.08 0 0 0 13 13.844a3.36 3.36 0 0 1-4.064 3.285L6 16.5"/></svg>
    `,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V9h14v11m0-13H5V6h14v1Z"/></svg>
    `,
  arrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m17.71 11.29l-5-5a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-5 5a1 1 0 0 0 1.42 1.42L11 9.41V17a1 1 0 0 0 2 0V9.41l3.29 3.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"></path></svg>`,
  chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none"><g clipPath="url(#SVGFd4lJeyK)"><path fill="currentColor" fillRule="evenodd" d="M3.58 4.109a.75.75 0 0 0 1.061 1.06L8 1.811l3.354 3.353a.75.75 0 0 0 1.06-1.06L8.53.22a.75.75 0 0 0-1.06 0zm8.84 7.782a.75.75 0 1 0-1.061-1.06l-3.36 3.358l-3.353-3.353a.75.75 0 1 0-1.06 1.06L7.47 15.78a.75.75 0 0 0 1.06 0z" clipRule="evenodd"></path></g><defs><clipPath id="SVGFd4lJeyK"><path fill="currentColor" d="M0 0h16v16H0z"></path></clipPath></defs></g></svg>`,
  stack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M229.18 173a6 6 0 0 1-2.16 8.2l-96 56a6 6 0 0 1-6 0l-96-56a6 6 0 0 1 6-10.36l93 54.23l93-54.23a6 6 0 0 1 8.16 2.16M221 122.82l-93 54.23l-93-54.23a6 6 0 0 0-6 10.36l96 56a6 6 0 0 0 6 0l96-56a6 6 0 0 0-6-10.36M26 80a6 6 0 0 1 3-5.18l96-56a6 6 0 0 1 6 0l96 56a6 6 0 0 1 0 10.36l-96 56a6 6 0 0 1-6 0l-96-56A6 6 0 0 1 26 80m17.91 0L128 129.05L212.09 80L128 31Z"></path></svg>`,
  paymentMethod: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M13.5 13a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zM2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25zM4.75 5A1.75 1.75 0 0 0 3 6.75V8h14V6.75A1.75 1.75 0 0 0 15.25 5zM17 9H3v4.25c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 17 13.25z"></path></svg>`,
  description: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M2.5 5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1zM2 11.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1z"></path></svg>`,
  // chevron: ``,
  // chevron: ``,
  // chevron: ``,
  // chevron: ``,
};

interface Props {
  name: string;
  width?: string;
}

const JIcon: React.FC<Props> = ({ name, width = "w-3" }) => {
  return (
    <div
      className={width}
      dangerouslySetInnerHTML={{ __html: svgIcons[name] || "" }}
    />
  );
};

export default JIcon;
