import { cn } from '@/lib/utils';
import React from 'react';

type ReelLogoProps = {
  className?: string;
  color?: string;
  secColor?: string;
};

export default function ReelLogo({ className, color = '#E7DF1A', secColor = '#ffffff' }: ReelLogoProps) {
  return (
    <svg
      className={cn('shadow-black drop-shadow-md', className)}
      width='160'
      height='90'
      viewBox='0 0 160 90'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M121.387 46V16H125.605V42.7773H141.798V46H121.387Z' fill={color} />
      <path
        d='M88.9284 46V16H109.952V19.2227H93.1467V29.3594H108.863V32.582H93.1467V42.7773H110.224V46H88.9284Z'
        fill={color}
      />
      <path
        d='M56.4698 46V16H77.4933V19.2227H60.6882V29.3594H76.4047V32.582H60.6882V42.7773H77.7655V46H56.4698Z'
        fill={color}
      />
      <path
        d='M22 46V16H33.7704C36.4919 16 38.7258 16.4004 40.4721 17.2012C42.2184 17.9922 43.5111 19.0811 44.3502 20.4678C45.1893 21.8545 45.6089 23.4316 45.6089 25.1992C45.6089 26.9668 45.1893 28.5342 44.3502 29.9014C43.5111 31.2686 42.2241 32.3428 40.4891 33.124C38.7542 33.8955 36.5373 34.2812 33.8385 34.2812H24.3133V31H33.7024C35.5621 31 37.0589 30.7656 38.1929 30.2969C39.3381 29.8281 40.1659 29.1641 40.6762 28.3047C41.1978 27.4355 41.4586 26.4004 41.4586 25.1992C41.4586 23.998 41.1978 22.9482 40.6762 22.0498C40.1546 21.1514 39.3211 20.458 38.1758 19.9697C37.0306 19.4717 35.5167 19.2227 33.6344 19.2227H26.2183V46H22ZM38.397 32.5234L46.9697 46H42.071L33.6344 32.5234H38.397Z'
        fill={color}
      />
      <path
        d='M138.502 74.0001C137.761 74.0001 137.154 73.8463 136.683 73.5387C136.211 73.2218 135.84 72.7884 135.571 72.2384C135.311 71.6792 135.123 71.0407 135.007 70.323C134.902 69.6053 134.849 68.8409 134.849 68.03L137.535 67.7224C137.535 68.0207 137.544 68.3702 137.564 68.771C137.592 69.1625 137.636 69.5493 137.694 69.9315C137.761 70.3043 137.857 70.6166 137.982 70.8682C138.117 71.1106 138.29 71.2318 138.502 71.2318C138.839 71.2318 139.065 71.0453 139.181 70.6725C139.306 70.2997 139.369 69.801 139.369 69.1765C139.369 68.4774 139.234 67.7597 138.964 67.0234C138.695 66.2777 138.295 65.4714 137.766 64.6046C137.255 63.8403 136.798 63.0759 136.394 62.3116C135.989 61.538 135.667 60.7737 135.426 60.0187C135.195 59.2637 135.08 58.5273 135.08 57.8096C135.08 57.2037 135.142 56.6165 135.267 56.0479C135.402 55.4794 135.604 54.9667 135.874 54.51C136.143 54.0533 136.49 53.6897 136.914 53.4194C137.347 53.1398 137.867 53 138.473 53C139.224 53 139.831 53.1491 140.293 53.4474C140.765 53.7364 141.131 54.1372 141.39 54.6498C141.65 55.1531 141.829 55.731 141.925 56.3835C142.021 57.036 142.069 57.7211 142.069 58.4388L139.369 58.7464C139.369 58.4854 139.359 58.1871 139.34 57.8516C139.321 57.5067 139.282 57.1804 139.224 56.8729C139.176 56.5559 139.094 56.295 138.979 56.0899C138.873 55.8755 138.724 55.7683 138.531 55.7683C138.252 55.7683 138.059 55.9454 137.953 56.2996C137.857 56.6538 137.809 57.1338 137.809 57.7397C137.809 58.4667 137.973 59.2077 138.3 59.9627C138.627 60.7177 139.094 61.5846 139.701 62.5633C140.433 63.747 141.015 64.8236 141.448 65.793C141.881 66.7624 142.098 67.797 142.098 68.8969C142.098 69.5027 142.04 70.1086 141.925 70.7145C141.809 71.3203 141.612 71.8702 141.333 72.3643C141.063 72.8583 140.697 73.2544 140.235 73.5527C139.783 73.851 139.205 74.0001 138.502 74.0001Z'
        fill={secColor}
      />
      <path
        d='M122.368 73.7764V53.2238H124.895L127.018 62.9828L127.206 64.0873H127.321V53.2238H129.849V73.7764H127.538L125.213 64.0594L125.011 62.7731H124.895V73.7764H122.368Z'
        fill={secColor}
      />
      <path
        d='M113.859 74.0001C113.069 74.0001 112.415 73.8043 111.895 73.4129C111.384 73.0121 110.999 72.4854 110.739 71.833C110.479 71.1805 110.349 70.4674 110.349 69.6938V57.3063C110.349 56.542 110.479 55.8382 110.739 55.1951C110.999 54.5426 111.384 54.016 111.895 53.6152C112.415 53.2051 113.069 53 113.859 53C114.677 53 115.341 53.2051 115.852 53.6152C116.372 54.016 116.752 54.5426 116.992 55.1951C117.243 55.8382 117.368 56.542 117.368 57.3063V69.6938C117.368 70.4674 117.238 71.1805 116.978 71.833C116.728 72.4854 116.343 73.0121 115.823 73.4129C115.312 73.8043 114.658 74.0001 113.859 74.0001ZM113.888 71.064C114.186 71.064 114.383 70.9242 114.48 70.6445C114.576 70.3649 114.624 70.048 114.624 69.6938V57.3063C114.624 56.9521 114.571 56.6352 114.465 56.3555C114.369 56.0759 114.176 55.9361 113.888 55.9361C113.599 55.9361 113.397 56.0759 113.281 56.3555C113.175 56.6258 113.122 56.9428 113.122 57.3063V69.6938C113.122 70.076 113.175 70.4022 113.281 70.6725C113.397 70.9335 113.599 71.064 113.888 71.064Z'
        fill={secColor}
      />
      <path d='M102.606 73.7764V53.2238H105.35V73.7764H102.606Z' fill={secColor} />
      <path d='M92.5223 73.7764V56.3276H90.1973V53.2238H97.6057V56.3276H95.2662V73.7764H92.5223Z' fill={secColor} />
      <path
        d='M81.7025 74.0001C80.8938 74.0001 80.2343 73.795 79.724 73.3849C79.2138 72.9655 78.8383 72.4295 78.5976 71.777C78.3569 71.1153 78.2366 70.4208 78.2366 69.6938V57.3063C78.2366 56.5886 78.3617 55.9035 78.612 55.251C78.8624 54.5892 79.2427 54.0486 79.7529 53.6292C80.2728 53.2097 80.9227 53 81.7025 53C82.3187 53 82.8434 53.1305 83.2766 53.3915C83.7195 53.6525 84.0805 53.9973 84.3597 54.4261C84.6485 54.8549 84.8603 55.3209 84.9951 55.8242C85.1299 56.3276 85.1973 56.8216 85.1973 57.3063V60.2703H82.569V57.2364C82.569 56.9195 82.5112 56.6258 82.3957 56.3555C82.2898 56.0759 82.078 55.9361 81.7603 55.9361C81.4714 55.9361 81.2741 56.0759 81.1682 56.3555C81.0623 56.6352 81.0093 56.9288 81.0093 57.2364V69.7637C81.0093 70.0713 81.0671 70.3649 81.1826 70.6445C81.2981 70.9242 81.4907 71.064 81.7603 71.064C82.0876 71.064 82.3042 70.9288 82.4101 70.6585C82.516 70.3789 82.569 70.0806 82.569 69.7637V66.7297H85.1973V69.6938C85.1973 70.4768 85.0673 71.1945 84.8074 71.8469C84.5571 72.4901 84.1768 73.0121 83.6665 73.4129C83.1563 73.8043 82.5016 74.0001 81.7025 74.0001Z'
        fill={secColor}
      />
      <path
        d='M67.3156 73.7764V53.2238H73.2366V56.3276H70.0595V61.8643H72.4278V64.8843H70.0595V70.6726H73.2366V73.7764H67.3156Z'
        fill={secColor}
      />
      <path d='M56.2936 73.7764V53.2238H59.0374V70.9802H62.3156V73.7764H56.2936Z' fill={secColor} />
      <path
        d='M45.1416 73.7764V53.2238H51.2936V56.3276H47.8855V61.7245H50.1816V64.8283H47.8855V73.7764H45.1416Z'
        fill={secColor}
      />
      <path
        d='M34.2206 73.7764V53.2238H40.1416V56.3276H36.9645V61.8643H39.3329V64.8843H36.9645V70.6726H40.1416V73.7764H34.2206Z'
        fill={secColor}
      />
      <path
        d='M22 73.7764V53.2238H24.6861C26.1687 53.2238 27.2615 53.7271 27.9643 54.7337C28.6767 55.7311 29.0329 57.2038 29.0329 59.1519C29.0329 60.2145 28.8837 61.1699 28.5852 62.0181C28.2964 62.8663 27.9113 63.4954 27.4299 63.9056L29.2207 73.7764H26.4335L25.0471 64.9681H24.7439V73.7764H22ZM24.7439 62.3816C25.1578 62.3816 25.4804 62.2418 25.7114 61.9621C25.9425 61.6825 26.1013 61.305 26.188 60.8296C26.2843 60.3543 26.3324 59.8323 26.3324 59.2637C26.3324 58.3876 26.2217 57.6605 26.0002 57.0826C25.7884 56.5047 25.3696 56.2158 24.7439 56.2158V62.3816Z'
        fill={secColor}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M120 4H40C30.4588 4 23.7053 4.00849 18.5876 4.69656C13.5848 5.36916 10.7481 6.62444 8.68629 8.68629C6.62443 10.7481 5.36916 13.5848 4.69656 18.5876C4.00849 23.7053 4 30.4588 4 40V50C4 59.5412 4.00849 66.2947 4.69656 71.4124C5.36916 76.4152 6.62444 79.2519 8.68629 81.3137C10.7481 83.3756 13.5848 84.6308 18.5876 85.3034C23.7053 85.9915 30.4588 86 40 86H120C129.541 86 136.295 85.9915 141.412 85.3034C146.415 84.6308 149.252 83.3756 151.314 81.3137C153.376 79.2519 154.631 76.4152 155.303 71.4124C155.992 66.2947 156 59.5412 156 50V40C156 30.4588 155.992 23.7053 155.303 18.5876C154.631 13.5848 153.376 10.7481 151.314 8.68629C149.252 6.62444 146.415 5.36916 141.412 4.69656C136.295 4.00849 129.541 4 120 4ZM5.85786 5.85786C0 11.7157 0 21.1438 0 40V50C0 68.8562 0 78.2843 5.85786 84.1421C11.7157 90 21.1438 90 40 90H120C138.856 90 148.284 90 154.142 84.1421C160 78.2843 160 68.8562 160 50V40C160 21.1438 160 11.7157 154.142 5.85786C148.284 0 138.856 0 120 0H40C21.1438 0 11.7157 0 5.85786 5.85786Z'
        fill={color}
      />
    </svg>
  );
}
