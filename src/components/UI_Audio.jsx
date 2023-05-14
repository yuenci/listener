export default  function UI_Audio(props) {
  const { src, ...rest } = props;
  return (
    <audio {...rest}>
      <source src={src} />
    </audio>
  );
}