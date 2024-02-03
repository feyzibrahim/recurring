"use client";
import { useTheme } from "next-themes";

const EmptyData = () => {
  const { resolvedTheme } = useTheme();
  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        opacity="0.1"
        cx="90"
        cy="174.6"
        rx="90"
        ry="5.4"
        fill={resolvedTheme === "dark" ? "#2E3237" : "#a6a6a6"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M46.5258 23.6927C47.2713 23.7023 47.8679 24.3144 47.8584 25.06C47.8488 25.8055 47.2367 26.4021 46.4912 26.3925L46.0412 26.3867C36.1009 26.2592 27.9393 34.214 27.8117 44.1543L27.7586 48.2939C27.7496 48.9898 27.1783 49.5466 26.4825 49.5377C25.7867 49.5287 25.2299 48.9574 25.2388 48.2616L25.2919 44.1219C25.4452 32.1744 34.1666 23.5341 46.0758 23.687L46.5258 23.6927ZM51.4581 25.1061C51.4932 22.3726 49.3056 20.1281 46.572 20.093L46.122 20.0873C32.1865 19.9084 21.8705 30.1785 21.6922 44.0758L21.6391 48.2154C21.6046 50.8993 23.7524 53.1029 26.4363 53.1374C29.1202 53.1718 31.3238 51.024 31.3583 48.3401L31.4114 44.2005C31.5135 36.2482 38.0428 29.8844 45.995 29.9864L46.445 29.9922C49.1785 30.0273 51.423 27.8397 51.4581 25.1061ZM42.9407 120.076L42.9411 120.078L42.9416 120.083C42.9407 120.078 42.9406 120.076 42.9407 120.076ZM42.9436 120.091C42.9582 120.041 43.0808 119.657 44.076 119.022C45.1168 118.358 46.7358 117.673 48.9272 117.022C50.1654 117.418 51.5021 117.788 52.9215 118.13C60.6343 119.987 71.1967 121.117 82.7988 121.117C90.735 121.117 98.1757 120.588 104.547 119.663C104.45 120.562 104.4 121.476 104.4 122.401C104.4 123.453 104.465 124.49 104.59 125.508C98.2883 126.308 90.8191 126.774 82.7988 126.774C71.3786 126.774 61.0904 125.83 53.7021 124.325C49.9931 123.569 47.1093 122.691 45.1964 121.77C44.2358 121.307 43.6147 120.878 43.2579 120.523C43.0124 120.278 42.9555 120.136 42.9436 120.091ZM122.656 98.1704C114.169 100.598 107.513 107.365 105.242 115.917C98.8128 116.926 91.1025 117.517 82.7988 117.517C71.3944 117.517 61.1282 116.403 53.7641 114.63C50.0679 113.74 47.203 112.708 45.3057 111.628C43.2679 110.468 42.9417 109.61 42.9417 109.288V87.6317C43.1662 87.7532 43.3974 87.8708 43.6343 87.9849C45.9373 89.094 49.154 90.0441 52.9835 90.8242C60.6721 92.3904 71.2124 93.3459 82.7988 93.3459C94.3852 93.3459 104.926 92.3904 112.614 90.8242C116.444 90.0441 119.66 89.094 121.963 87.9849C122.2 87.8708 122.432 87.7532 122.656 87.6317V98.1704ZM126.256 83.0601V97.4214C127.35 97.2764 128.466 97.2015 129.6 97.2015C143.518 97.2015 154.8 108.484 154.8 122.401C154.8 136.319 143.518 147.601 129.6 147.601C128.422 147.601 127.264 147.521 126.129 147.364C125.656 149.282 123.927 150.729 122.073 151.785C119.754 153.104 116.518 154.233 112.676 155.158C104.963 157.015 94.401 158.145 82.7988 158.145C71.1967 158.145 60.6343 157.015 52.9215 155.158C49.0793 154.233 45.8436 153.104 43.5249 151.785C41.3469 150.545 39.3417 148.764 39.3417 146.317V120.088V120.088C39.3417 118.211 40.7491 116.874 42.1397 115.987C42.6797 115.643 43.2945 115.315 43.9746 115.004C43.8211 114.922 43.6712 114.84 43.5249 114.756C41.3469 113.517 39.3417 111.736 39.3417 109.288V83.0601V83.0599C39.3418 81.2214 40.6942 79.9018 42.0423 79.0218C42.6069 78.6533 43.2559 78.3045 43.9775 77.9744C43.8236 77.8924 43.6733 77.8098 43.5267 77.7263C41.3486 76.4866 39.3435 74.7058 39.3435 72.2584V46.0298C39.3435 45.6861 39.4398 45.3648 39.607 45.0916C40.0227 40.0561 59.2017 36.0015 82.8001 36.0015C106.396 36.0015 125.573 40.055 125.993 45.0897C126.161 45.3633 126.258 45.6852 126.258 46.0298V72.2584C126.258 74.7058 124.253 76.4866 122.075 77.7263C121.927 77.8101 121.776 77.893 121.622 77.9753C122.186 78.2333 122.704 78.5017 123.17 78.781C124.686 79.6889 126.256 81.0742 126.256 83.0599V83.0601ZM105.286 129.048C107.591 137.502 114.188 144.185 122.59 146.614C122.422 147.041 121.87 147.758 120.292 148.656C118.395 149.736 115.53 150.768 111.834 151.658C104.469 153.431 94.2033 154.545 82.7988 154.545C71.3944 154.545 61.1282 153.431 53.7641 151.658C50.0679 150.768 47.203 149.736 45.3057 148.656C43.2679 147.496 42.9417 146.639 42.9417 146.317V124.66C43.1662 124.781 43.3974 124.899 43.6343 125.013C45.9373 126.122 49.154 127.072 52.9835 127.852C60.6721 129.419 71.2124 130.374 82.7988 130.374C91.0479 130.374 98.7592 129.89 105.286 129.048ZM42.9435 48.8357V72.2584C42.9435 72.5802 43.2696 73.4377 45.3075 74.5976C47.2047 75.6774 50.0696 76.7098 53.7659 77.5996C61.13 79.3725 71.3962 80.4869 82.8006 80.4869C94.205 80.4869 104.471 79.3725 111.835 77.5996C113.61 77.1725 115.192 76.7125 116.568 76.2302L116.57 76.2237L116.58 76.2263C118.065 75.705 119.31 75.1577 120.294 74.5976C122.332 73.4377 122.658 72.5802 122.658 72.2584V48.8352C116.129 52.1719 100.742 54.5158 82.8001 54.5158C64.8591 54.5158 49.4724 52.1722 42.9435 48.8357ZM121.321 81.8698C120.266 81.2382 118.709 80.5994 116.668 79.993C115.431 80.3892 114.096 80.7583 112.678 81.0996C104.965 82.9564 94.4028 84.0869 82.8006 84.0869C71.1984 84.0869 60.6361 82.9564 52.9233 81.0996C51.4518 80.7454 50.0693 80.3613 48.7933 79.948L48.8169 80.0267C46.6278 80.6841 45.026 81.3733 44.0101 82.0364C43.0768 82.6456 42.9581 83.0118 42.9436 83.0633C42.9555 83.1079 43.0123 83.2501 43.2579 83.4946C43.6147 83.8498 44.2358 84.2788 45.1964 84.7414C47.1093 85.6628 49.9931 86.5411 53.7021 87.2967C61.0904 88.8017 71.3786 89.7458 82.7988 89.7458C94.219 89.7458 104.507 88.8017 111.896 87.2967C115.605 86.5411 118.488 85.6628 120.401 84.7414C121.362 84.2788 121.983 83.8498 122.34 83.4946C122.585 83.2501 122.642 83.1079 122.654 83.0633L122.654 83.0627C122.638 83.0124 122.501 82.5764 121.321 81.8698ZM122.657 83.048C122.657 83.048 122.657 83.0503 122.656 83.055C122.656 83.0503 122.657 83.048 122.657 83.048ZM42.9416 83.055C42.9407 83.0503 42.9406 83.048 42.9407 83.048C42.9409 83.048 42.9414 83.0503 42.9416 83.055ZM129.6 100.801C117.671 100.801 108 110.472 108 122.401C108 134.331 117.671 144.001 129.6 144.001C141.529 144.001 151.2 134.331 151.2 122.401C151.2 110.472 141.529 100.801 129.6 100.801ZM129.6 130.501C130.843 130.501 131.85 129.494 131.85 128.251C131.85 127.009 130.843 126.001 129.6 126.001C128.357 126.001 127.35 127.009 127.35 128.251C127.35 129.494 128.357 130.501 129.6 130.501ZM129.6 115.201C126.521 115.201 123.781 116.647 122.019 118.903C121.407 119.686 120.276 119.825 119.492 119.213C118.709 118.601 118.57 117.47 119.182 116.687C121.597 113.595 125.366 111.601 129.6 111.601C133.834 111.601 137.603 113.595 140.019 116.687C140.631 117.47 140.492 118.601 139.708 119.213C138.925 119.825 137.794 119.686 137.182 118.903C135.419 116.647 132.679 115.201 129.6 115.201ZM124.719 124.785C125.855 123.331 127.618 122.401 129.6 122.401C131.582 122.401 133.346 123.331 134.482 124.785C135.094 125.568 136.225 125.707 137.008 125.095C137.792 124.483 137.931 123.352 137.319 122.569C135.53 120.279 132.737 118.801 129.6 118.801C126.463 118.801 123.67 120.279 121.882 122.569C121.27 123.352 121.409 124.483 122.192 125.095C122.976 125.707 124.107 125.568 124.719 124.785Z"
        fill={resolvedTheme === "dark" ? "#2E3237" : "#a6a6a6"}
      />
    </svg>
  );
};

export default EmptyData;