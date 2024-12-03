import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (
    message,
    variant = 'default',
  ) => {
    enqueueSnackbar(message, { variant });
  };

  return showToast;
};

export default useToast;
