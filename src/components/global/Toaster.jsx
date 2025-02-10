import { toast , Toaster } from 'react-hot-toast';


export const ToasterContainer = () => {
    return(
        <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    )
}

export const SuccessToast = (message) => {
  toast.success(message, {
    duration: 3000, 
    style: {
      background: 'green',
      color: '#fff',
    },
    iconTheme: {
      primary: 'white',
      secondary: 'green',
    },
  });
};

export const ErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    style: {
      background: '#ff4d4d',
      color: '#fff',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#ff4d4d',
    },
  });
};