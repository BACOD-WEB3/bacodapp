import { toast } from 'react-toastify';

const AUTOCLOSE_DEFAULT = 2500;
let loadingToastId = null;
export const notify = (message) =>
  toast(message, {
    type: toast.TYPE.DEFAULT,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyError = (message) =>
  toast(message, {
    type: toast.TYPE.ERROR,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifyWarning = (message) =>
  toast(message, {
    type: toast.TYPE.WARNING,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
export const notifySuccess = (message) =>
  toast(message, {
    type: toast.TYPE.SUCCESS,
    autoClose: AUTOCLOSE_DEFAULT,
    className: 'text-left',
  });
