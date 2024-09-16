export const catchError = (error) => {
    let message = "Expectation Failed";
    if (error) {
      if (
        error.response &&
        typeof error.response.data === "string" &&
        error.response.data?.length !== 0
      )
        message = error.response.data;
      else if (
        error.response &&
        error.response.data.message &&
        error.response.data.message.length !== 0
      )
        message = error.response.data.message;
      else if (
        error.response &&
        error.response.data.error &&
        error.response.data.error.length !== 0
      )
        message = error.response.data.error;
    }

    return {
      success: false,
      message: message,
      ...error?.response,
    };
  };