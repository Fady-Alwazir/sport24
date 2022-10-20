import './style.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
// import images
import Sport24Logo from '../../title-cover.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={Sport24Logo} alt="sport24 logo" />
        <img src={Sport24Logo} alt="news24 logo" />
      </div>
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
          <PersonOutlineIcon
            sx={{
              fontSize: '32px',
            }}
          />
          <SearchIcon
            sx={{
              color: 'white',
              background: 'blue',
              fontSize: '32px',
              borderRadius: '50%',
              padding: '2px',
              transform: 'scale(1.4)',
              transform: 'rotate(90deg)',
            }}
          ></SearchIcon>
        </div>
      </div>
    </header>
  );
};
export default Header;
