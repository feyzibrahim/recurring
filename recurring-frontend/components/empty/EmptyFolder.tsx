"use client";
import { useTheme } from "next-themes";

const EmptyFolder = () => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.4732 37.5455C99.277 35.6466 99.1999 32.645 97.301 30.8412L90.2278 24.1223C88.3289 22.3185 85.3272 22.3957 83.5234 24.2946C81.7196 26.1935 81.7968 29.1951 83.6957 30.9989L90.7689 37.7178C92.6678 39.5216 95.6694 39.4444 97.4732 37.5455ZM94.8216 33.4513C95.279 33.8858 95.2976 34.6088 94.8631 35.0662C94.4286 35.5236 93.7056 35.5421 93.2482 35.1077L86.175 28.3888C85.7177 27.9543 85.6991 27.2313 86.1336 26.7739C86.568 26.3165 87.291 26.298 87.7484 26.7324L94.8216 33.4513ZM41.4008 37.8004C36.4302 37.8004 32.4008 41.8298 32.4008 46.8004V129.6C32.4008 134.187 35.8317 137.972 40.267 138.53V66.2664C40.267 61.2958 44.2964 57.2664 49.267 57.2664H118.267C123.238 57.2664 127.267 61.2958 127.267 66.2664V68.6896H132.86V60.7825C132.86 55.812 128.83 51.7825 123.86 51.7825H97.2382C93.818 51.7825 90.5448 50.3922 88.1702 47.9308L81.0513 40.5517C79.3551 38.7935 77.0171 37.8004 74.5741 37.8004H41.4008ZM136.46 68.6896V60.7825C136.46 53.8237 130.818 48.1825 123.86 48.1825H97.2382C94.7952 48.1825 92.4572 47.1894 90.761 45.4313L83.6421 38.0522C81.2675 35.5907 77.9943 34.2004 74.5741 34.2004H41.4008C34.442 34.2004 28.8008 39.8416 28.8008 46.8004V129.6C28.8008 136.559 34.442 142.2 41.4008 142.2H72.0641C72.987 155.278 83.8885 165.6 97.2008 165.6C110.513 165.6 121.415 155.278 122.338 142.2L137.734 142.2C144.693 142.2 150.334 136.559 150.334 129.6V81.2896C150.334 74.3308 144.693 68.6896 137.734 68.6896H136.46ZM122.338 138.6L137.734 138.6C142.705 138.6 146.734 134.571 146.734 129.6V81.2896C146.734 76.3191 142.705 72.2896 137.734 72.2896H57.7804C52.8099 72.2896 48.7804 76.3191 48.7804 81.2896V138.6H72.0641C72.987 125.523 83.8884 115.2 97.2008 115.2C110.513 115.2 121.415 125.523 122.338 138.6ZM105.52 34.3629C102.901 34.3964 100.805 36.5466 100.839 39.1655C100.872 41.7844 103.023 43.8802 105.641 43.8466L115.396 43.7216C118.015 43.688 120.111 41.5378 120.077 38.919C120.044 36.3001 117.894 34.2043 115.275 34.2379L105.52 34.3629ZM104.438 39.1194C104.43 38.4886 104.935 37.9707 105.566 37.9626L115.321 37.8376C115.952 37.8295 116.47 38.3343 116.478 38.9651C116.486 39.5959 115.981 40.1138 115.35 40.1219L105.595 40.2469C104.964 40.255 104.447 39.7502 104.438 39.1194ZM75.6008 140.4C75.6008 128.471 85.2715 118.8 97.2008 118.8C109.13 118.8 118.801 128.471 118.801 140.4C118.801 152.33 109.13 162 97.2008 162C85.2715 162 75.6008 152.33 75.6008 140.4ZM92.7008 128.7C92.7008 126.215 94.7155 124.2 97.2008 124.2C99.6861 124.2 101.701 126.215 101.701 128.7V139.5C101.701 141.986 99.6861 144 97.2008 144C94.7155 144 92.7008 141.986 92.7008 139.5V128.7ZM97.2008 127.8C96.7038 127.8 96.3008 128.203 96.3008 128.7V139.5C96.3008 139.997 96.7038 140.4 97.2008 140.4C97.6979 140.4 98.1008 139.997 98.1008 139.5V128.7C98.1008 128.203 97.6979 127.8 97.2008 127.8ZM97.2008 156.6C94.7155 156.6 92.7008 154.586 92.7008 152.1C92.7008 149.615 94.7155 147.6 97.2008 147.6C99.6861 147.6 101.701 149.615 101.701 152.1C101.701 154.586 99.6861 156.6 97.2008 156.6ZM96.3008 152.1C96.3008 152.597 96.7038 153 97.2008 153C97.6979 153 98.1008 152.597 98.1008 152.1C98.1008 151.603 97.6979 151.2 97.2008 151.2C96.7038 151.2 96.3008 151.603 96.3008 152.1Z"
        fill={resolvedTheme === "dark" ? "#2E3237" : "#a6a6a6"}
      />
    </svg>
  );
};

export default EmptyFolder;
