const Spinner = ({ props: { size = 20 } }) => (
  <div
    style={{
      border: `${size / 5}px solid lightblue`,
      borderTop: `${size / 5}px solid #777`,
      borderRadius: '50%',
      width: `${size}px`,
      height: `${size}px`,
      animation: 'spin 2s linear infinite',
    }}
  />
)

export default Spinner
