import "./index.css";
export default function Login() {
  return (
    <div>
      <label
        style={{ fontSize: 20, color: "rgb(155, 155, 155)", marginBottom: 10 }}
      >
        登录
      </label>
      <div className="login_box">
        <input type="text" v-model="username" required />
        <label>用户名</label>
      </div>
      <div className="login_box">
        <input type="text" v-model="username" required />
        <label>密码</label>
      </div>
      <button
        style={{
          marginTop: 5,
        }}
        className="minor-button"
      >
        登录 Flash
      </button>
    </div>
  );
}
