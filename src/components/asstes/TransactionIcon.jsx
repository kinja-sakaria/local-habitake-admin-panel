const TransactionIcon = ({ ...otherProps }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" { ...otherProps }>
        <path d="M21 6H3M21 6L17 10M21 6L17 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3 18H21M3 18L7 22M3 18L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </>
  );
};
export default TransactionIcon;
