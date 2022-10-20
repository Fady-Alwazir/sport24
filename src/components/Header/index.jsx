import './style.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const Header = () => {
  return (
    <header className="header">
      <div className="header-logo"></div>
      <div className="header-nav">
        <div className class="links-list">
          <ul>
            <li>
              <span>|</span> <a href="#">متابعات</a>
            </li>
            <li>
              <span>|</span> <a href="#">دوليات</a>
            </li>
            <li>
              <span>|</span> <a href="#">تجارة وأسواق</a>
            </li>
            <li>
              <span>|</span> <a href="#">منوعات</a>
            </li>
            <li>
              <span>|</span> <a href="#">مقال</a>
            </li>
            <li>
              <span>|</span> <a href="#">تقنية</a>
            </li>
            <li>
              <span>|</span> <a href="#">طب</a>
            </li>
          </ul>
        </div>
        <div className="header-user-info">
          <p>الدخول /التسجيل</p>
          <PersonOutlineIcon />
        </div>
      </div>
    </header>
  );
};
export default Header;
