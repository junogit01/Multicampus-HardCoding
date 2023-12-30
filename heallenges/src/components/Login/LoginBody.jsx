import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos";
import { useEffect, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "@recoils/login";
import axios from "axios";

function LoginBody() {
  useEffect(() => {
    AOS.init();
  }, []);

  const setUser = useSetRecoilState(loginState);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeData = useCallback((evt) => {
    setData((data) => ({ ...data, [evt.target.name]: evt.target.value }));
  }, []);

  const login = useCallback(
    async (evt) => {
      evt.preventDefault();
      const resp = await axios.post("http://heallenges.cafe24app.com/login", data);
      if (resp.data.status === 200) {
        // const storage = window.sessionStorage;
        // storage.setItem('name', resp.data.user.name);
        // storage.setItem('email', resp.data.user.email);
        // storage.setItem("id", resp.data.user.id);
        setUser(resp.data.user);

        navigate("/");
        return;
      } else {
        setData({ email: "", password: "" });
      }
    },
    [data, setUser, navigate]
  );

  return (
    <section style={{ paddingTop: "-100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className="title-wrap d-flex justify-content-between"
              style={{ paddingBottom: "15px" }}
            >
              <div className="title-box">
                <h2 className="title-a">로그인</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <form className="col-sm-12">
            <div className="col-sm-12 position-relative form-group mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={data.email}
                onChange={changeData}
              />
            </div>
            <div className="col-sm-12 position-relative form-group mb-3">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={data.password}
                onChange={changeData}
              />
            </div>

            <div className="col-sm-12 position-relative form-group">
              <button
                type="submit"
                className="btn btn-danger btn-sm"
                onClick={login}
              >
                로그인
              </button>{" "}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginBody;
