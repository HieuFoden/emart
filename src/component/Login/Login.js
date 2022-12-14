import './Login.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { loginUser } from '../../service/ApiService';

const Login = (props) => {
    const { user, loginContext } = useContext(UserContext);

    // let history = useHistory();
    let navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    };
    const [objValidInput, setObjValidInput] = useState(defaultValidInput);


    const handleCreateNewAccount = (props) => {
        navigate('/register');
    };
    const handleLogin = async () => {
        setObjValidInput(defaultValidInput);

        if (!valueLogin) {
            setObjValidInput({ ...defaultValidInput, isValidValueLogin: false });
            toast.error("メール又は電話番号を入力してください");
            return;
        };
        if (!password) {
            setObjValidInput({ ...defaultValidInput, isValidPassword: false });
            toast.error("パスワードを入力してください");
            return;
        };

        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true, //xac thuc duoc nguoi dung hay chua
                token,
                account: { groupWithRoles, email, username }
            };

            localStorage.setItem('jwt', token);
            loginContext(data);
            navigate('/');
            toast.success("ログイン成功しました");
        }

        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM);
        }
        // console.log('>>>check response login : ', response.data)
    };

    const handlePressEnter = (event) => {
        // console.log(event.charCode, event.code)
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        if (user && user.isAuthenticated) {
            navigate('/');
        }
    }, [user])

    return (
        <div className="login-container">
            <div className="container">   {/* tao khoang trong left-right */}
                <div className="row">
                    <div className="content-left col-7">
                        <div className='brand'>
                            <Link to='/'><span title='Return to homepage'>Aki Shop</span></Link>
                        </div>
                        <div className='detail'>
                            Welcome. 本日,何を着ますか？
                        </div>
                    </div>
                    <div className="content-right col-5 d-flex flex-column gap-3 py-3 ">
                        <input
                            type="text"
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder='ユーザー名を入力ください'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input
                            type="password"
                            className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='パスワードを入力ください'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>ログイン</button>
                        <span className='text-center'><a className='forgot-password' href='#'>パスワードを忘れていますか？</a></span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>新規アカウント登録</button>
                            <div className='mt-3 return'>
                                <Link to='/'>
                                    <i className='fa fa-arrow-circle-left'></i>
                                    <span title='Return to homepage'>ホームページに戻る</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};


export default Login;