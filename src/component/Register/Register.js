import './Register.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '../../service/ApiService';
import { UserContext } from '../../context/UserContext';


const Register = (props) => {
    const { user } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    let navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            navigate('/');
        }
    }, [user]);

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error('メールが必須');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false }); //...copy lai gia tri ban dau -> ghi de
            return false;
        };
        let regEmail = /\S+@\S+\.\S+/; //js regular expression check email

        if (!regEmail.test(email)) {
            toast.error('メールアドレスの形式が正しくありません');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        let regPhone = new RegExp("^[0]{1}[0-9]{9}$");
        if (!regPhone.test(phone)) {
            toast.error('電話番号の形式が正しくありません');
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }

        if (!phone) {
            toast.error('電話番号が必須');
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        };
        if (!username) {
            toast.error('ユーザー名が必須');
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
            return false;
        };
        if (!password) {
            toast.error('パスワードが必須');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        };
        if (password !== confirmPassword) {
            toast.error('パスワードとパスワード確認の値が一致しません');
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
            return false;
        };
        if (password.length && confirmPassword.length < 4) {
            toast.error('パスワードとパスワード確認の長さが 3 文字以上の必要がある');
            return false;
        };



        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();

        if (check === true) {
            let response = await registerNewUser(email, phone, username, password);
            console.log('>>>check response :', response);
            let serverData = response;
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            } else {
                toast.error(serverData.EM);
            };
        };
    };

    const handlePressEnter = (event) => {
        // console.log(event.charCode, event.code)
        if (event.charCode === 13 && event.code === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="register-container">
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
                        <div className='form-group'>
                            <label>メール：</label>
                            <input type="text" className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='メールを入力ください'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>電話番号：</label>
                            <input type="text" className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='電話番号を入力ください'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>ユーザー名：</label>
                            <input type="text" className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'} placeholder='ユーザー名を入力ください'
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>パスワード：</label>
                            <input type="password" className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='パスワードを入力ください'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>パスワード確認：</label>
                            <input type="password"
                                className={objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='パスワード確認を入力ください'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                        </div>
                        <button className='btn btn-primary' onClick={() => handleRegister()}>登録</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>ログイン</button>
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


export default Register;