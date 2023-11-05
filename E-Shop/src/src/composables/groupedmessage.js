import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-badge.css';
const UseMessage = (options) => {
  ElMessage(options);
};
const typeArr = ['success', 'error', 'warning', 'info'];
typeArr.forEach((type) => {
  UseMessage[type] = (options) => {
    options = {
      message: options
    };
    options.type = type;
    options.grouping = true;
    return UseMessage(options);
  };
});
export { UseMessage };
