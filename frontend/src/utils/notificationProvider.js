import { notification } from "antd";

const notificationProvider = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message, type, placement = "topRight") => {
    api[type]({
      message: message,
      placement,
      style: { fontWeight: "bold" },
    });
  };

  return { openNotification, contextHolder };
};

export default notificationProvider;
