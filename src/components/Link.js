const Link = ({ href, className, children, onClick, style = null }) => {
  return (
    <a href={href} className={className} onClick={onClick} style={style}>
      {children}
    </a>
  );
};

export default Link;
