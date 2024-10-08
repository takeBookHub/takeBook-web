import { useAtom } from "jotai";
import { currentHomeContentAtom } from "../../atoms/siteStates.ts";

export default function Icon({ icon }: { icon: string }) {
  const [currentHomeContent] = useAtom(currentHomeContentAtom);

  const fillColor = currentHomeContent === icon ? "#23771e" : "black";

  switch (icon) {
    case "home":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M2.57143 22.4799H8.37354V13.5349H15.6265V22.4799H21.4286V8.79906L12 1.90012L2.57143 8.79906V22.4799ZM1 24V8.03902L12 0L23 8.03902V24H14.055V15.055H9.94496V24H1Z"
            fill={fillColor}
          />
        </svg>
      );
    case "chat":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="chat">
            <path
              id="Vector"
              d="M0 23V0H24V18.8558H4.10267L0 23ZM3.53333 17.5089H22.6667V1.34684H1.33333V19.7235L3.53333 17.5089Z"
              fill={fillColor}
            />
          </g>
        </svg>
      );
    case "leaderboard":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="leaderboard">
            <path
              id="Vector"
              d="M12 21.6635C13.6667 21.6635 15.0833 21.0788 16.25 19.9095C17.4167 18.7401 18 17.3201 18 15.6495C18 13.979 17.4167 12.559 16.25 11.3896C15.0833 10.2202 13.6667 9.63548 12 9.63548C10.3333 9.63548 8.91667 10.2202 7.75 11.3896C6.58333 12.559 6 13.979 6 15.6495C6 17.3201 6.58333 18.7401 7.75 19.9095C8.91667 21.0788 10.3333 21.6635 12 21.6635ZM8.15133 9.4143C8.57867 9.1352 9.03378 8.91035 9.51667 8.73973C9.99956 8.56933 10.4966 8.4447 11.0077 8.36585L7.97433 2.33645H4.641L8.15133 9.4143ZM15.8487 9.4143L19.3923 2.33645H16.0257L13.1153 8.11894L13.2617 8.41196C13.7266 8.50106 14.1761 8.62579 14.6103 8.78617C15.0446 8.94632 15.4573 9.1557 15.8487 9.4143ZM5.636 20.2396C5.65133 20.0905 5.68589 19.9257 5.73967 19.7451C5.79344 19.5642 5.87167 19.3726 5.97433 19.1704C5.56411 18.5057 5.268 17.7874 5.086 17.0154C4.90378 16.2436 4.85633 15.449 4.94367 14.6318C4.94367 13.9636 5.059 13.3297 5.28967 12.73C5.52056 12.1302 5.84111 11.5904 6.25133 11.1106C5.93333 11.1656 5.65378 11.28 5.41267 11.4537C5.17178 11.6277 5 11.8355 4.89733 12.0772C3.906 12.3186 3.13333 12.8776 2.57933 13.7541C2.02556 14.6306 1.85633 15.6016 2.07167 16.6672C2.07167 17.6611 2.41789 18.505 3.11033 19.1988C3.80256 19.8926 4.64444 20.2396 5.636 20.2396ZM18.364 20.2396C19.5709 20.1676 20.5898 19.6935 21.4207 18.8172C22.2513 17.9408 22.6667 16.8848 22.6667 15.6495C22.6667 14.4142 22.2513 13.3583 21.4207 12.4818C20.5898 11.6055 19.5709 11.1314 18.364 11.0595C18.2616 11.0595 18.159 11.0637 18.0563 11.0722C17.9539 11.0806 17.8513 11.0934 17.7487 11.1106C18.2462 11.7394 18.6347 12.4398 18.914 13.2118C19.1936 13.9836 19.3333 14.7962 19.3333 15.6495C19.3333 16.5028 19.1936 17.3154 18.914 18.0872C18.6347 18.8592 18.2462 19.5596 17.7487 20.1884C17.8513 20.2056 17.9539 20.2184 18.0563 20.2269C18.159 20.2353 18.2616 20.2396 18.364 20.2396ZM12 23C11.1453 23 10.3381 22.8677 9.57833 22.6031C8.81833 22.3382 8.12811 21.9573 7.50767 21.4604C7.27345 21.5393 7.02644 21.5928 6.76667 21.6211C6.50689 21.6494 6.24022 21.6635 5.96667 21.6635C4.32044 21.6635 2.91444 21.0793 1.74867 19.9108C0.582889 18.7423 0 17.333 0 15.6829C0 14.0536 0.567556 12.6598 1.70267 11.5015C2.83756 10.3432 4.21278 9.74607 5.82833 9.70999C6.01633 9.70999 6.19578 9.7228 6.36667 9.74841C6.53756 9.77425 6.70845 9.80432 6.87933 9.83862L2.46167 1H8.82067L12 7.37387L15.1793 1H21.5383L17.1793 9.74607C17.3333 9.71177 17.4916 9.68605 17.654 9.66889C17.8162 9.65174 17.9829 9.64317 18.154 9.64317C19.7864 9.68437 21.1689 10.2841 22.3013 11.4424C23.4338 12.6006 24 14.003 24 15.6495C24 17.3219 23.4171 18.7423 22.2513 19.9108C21.0856 21.0793 19.6684 21.6635 18 21.6635C17.7316 21.6635 17.4704 21.6494 17.2167 21.6211C16.9629 21.5928 16.7189 21.5393 16.4847 21.4604C15.8642 21.9402 15.1753 22.3167 14.418 22.59C13.6607 22.8633 12.8547 23 12 23ZM9.918 18.708L10.6973 16.13L8.61533 14.6422H11.1873L12 11.9228L12.8127 14.6422H15.3847L13.3027 16.13L14.082 18.708L12 17.1196L9.918 18.708Z"
              fill={fillColor}
            />
          </g>
        </svg>
      );
    case "community":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="group">
            <path
              id="Vector"
              d="M0 21V18.7604C0 18.1289 0.153343 17.586 0.460029 17.1316C0.766715 16.6774 1.17889 16.3144 1.69656 16.0426C2.80356 15.4807 3.90259 15.0328 4.99365 14.6988C6.08491 14.3648 7.3979 14.1978 8.93261 14.1978C10.4671 14.1978 11.78 14.3648 12.8712 14.6988C13.9625 15.0328 15.0615 15.4807 16.1683 16.0426C16.686 16.3144 17.0982 16.6774 17.4049 17.1316C17.7118 17.586 17.8652 18.1289 17.8652 18.7604V21H0ZM20.4174 21V18.6975C20.4174 17.9091 20.2677 17.1649 19.9682 16.465C19.669 15.765 19.2444 15.1645 18.6947 14.6634C19.3212 14.7994 19.9249 14.9882 20.5058 15.2297C21.0864 15.4714 21.6606 15.743 22.2285 16.0446C22.7814 16.3412 23.215 16.7206 23.5291 17.1829C23.843 17.6455 24 18.1503 24 18.6975V21H20.4174ZM8.93261 11.1626C7.87983 11.1626 6.9786 10.763 6.2289 9.96376C5.4792 9.1645 5.10435 8.20369 5.10435 7.08132C5.10435 5.95896 5.4792 4.99815 6.2289 4.19889C6.9786 3.39963 7.87983 3 8.93261 3C9.98538 3 10.8866 3.39963 11.6363 4.19889C12.386 4.99815 12.7609 5.95896 12.7609 7.08132C12.7609 8.20369 12.386 9.1645 11.6363 9.96376C10.8866 10.763 9.98538 11.1626 8.93261 11.1626ZM18.2088 7.08132C18.2088 8.20369 17.8339 9.1645 17.0842 9.96376C16.3345 10.763 15.4333 11.1626 14.3805 11.1626C14.3265 11.1626 14.2577 11.1562 14.1741 11.1433C14.0908 11.1301 14.0221 11.1157 13.968 11.1001C14.4004 10.5355 14.7326 9.90923 14.9647 9.2213C15.1969 8.53337 15.313 7.81902 15.313 7.07826C15.313 6.3375 15.1915 5.62962 14.9484 4.95461C14.7055 4.27961 14.3787 3.64904 13.968 3.06292C14.0367 3.03684 14.1054 3.01984 14.1741 3.0119C14.2428 3.00397 14.3116 3 14.3805 3C15.4333 3 16.3345 3.39963 17.0842 4.19889C17.8339 4.99815 18.2088 5.95896 18.2088 7.08132ZM1.27609 19.6396H16.5891V18.7604C16.5891 18.4411 16.5143 18.162 16.3645 17.923C16.2148 17.6843 15.9461 17.4558 15.5584 17.2377C14.6062 16.6953 13.6024 16.2798 12.5471 15.9912C11.492 15.7026 10.2872 15.5582 8.93261 15.5582C7.57783 15.5582 6.37288 15.7026 5.31777 15.9912C4.26245 16.2798 3.2587 16.6953 2.30653 17.2377C1.91881 17.4558 1.65009 17.6843 1.50036 17.923C1.35084 18.162 1.27609 18.4411 1.27609 18.7604V19.6396ZM8.93261 9.80221C9.63445 9.80221 10.2353 9.53579 10.7351 9.00295C11.2349 8.47011 11.4848 7.82957 11.4848 7.08132C11.4848 6.33308 11.2349 5.69254 10.7351 5.1597C10.2353 4.62686 9.63445 4.36044 8.93261 4.36044C8.23076 4.36044 7.62993 4.62686 7.13013 5.1597C6.63033 5.69254 6.38043 6.33308 6.38043 7.08132C6.38043 7.82957 6.63033 8.47011 7.13013 9.00295C7.62993 9.53579 8.23076 9.80221 8.93261 9.80221Z"
              fill={fillColor}
            />
          </g>
        </svg>
      );
    case "profile":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="account_circle_24dp_00000_FILL0_wght200_GRAD0_opsz24 1"
            clip-path="url(#clip0_318_74)"
          >
            <path
              id="Vector"
              d="M4.26167 19.3127C5.395 18.4973 6.59756 17.8526 7.86933 17.3783C9.14111 16.9039 10.518 16.6667 12 16.6667C13.482 16.6667 14.8589 16.9039 16.1307 17.3783C17.4024 17.8526 18.605 18.4973 19.7383 19.3127C20.6188 18.4016 21.3269 17.3256 21.8627 16.0847C22.3987 14.8436 22.6667 13.482 22.6667 12C22.6667 9.04445 21.6278 6.52778 19.55 4.45C17.4722 2.37222 14.9556 1.33333 12 1.33333C9.04445 1.33333 6.52778 2.37222 4.45 4.45C2.37222 6.52778 1.33333 9.04445 1.33333 12C1.33333 13.482 1.60133 14.8436 2.13733 16.0847C2.67311 17.3256 3.38122 18.4016 4.26167 19.3127ZM12.0007 12.6667C10.8771 12.6667 9.92945 12.281 9.15767 11.5097C8.38589 10.7383 8 9.79089 8 8.66733C8 7.54378 8.38567 6.59611 9.157 5.82433C9.92833 5.05256 10.8758 4.66667 11.9993 4.66667C13.1229 4.66667 14.0706 5.05233 14.8423 5.82367C15.6141 6.595 16 7.54244 16 8.666C16 9.78956 15.6143 10.7372 14.843 11.509C14.0717 12.2808 13.1242 12.6667 12.0007 12.6667ZM12 24C10.3264 24 8.75978 23.6884 7.3 23.0653C5.84022 22.4422 4.57011 21.5906 3.48967 20.5103C2.40944 19.4299 1.55778 18.1598 0.934667 16.7C0.311555 15.2402 0 13.6736 0 12C0 10.3264 0.311555 8.75978 0.934667 7.3C1.55778 5.84022 2.40944 4.57011 3.48967 3.48967C4.57011 2.40944 5.84022 1.55778 7.3 0.934666C8.75978 0.311555 10.3264 0 12 0C13.6736 0 15.2402 0.311555 16.7 0.934666C18.1598 1.55778 19.4299 2.40944 20.5103 3.48967C21.5906 4.57011 22.4422 5.84022 23.0653 7.3C23.6884 8.75978 24 10.3264 24 12C24 13.6736 23.6884 15.2402 23.0653 16.7C22.4422 18.1598 21.5906 19.4299 20.5103 20.5103C19.4299 21.5906 18.1598 22.4422 16.7 23.0653C15.2402 23.6884 13.6736 24 12 24ZM12 22.6667C13.2291 22.6667 14.4386 22.4517 15.6283 22.0217C16.8179 21.5919 17.846 21.0034 18.7127 20.2563C17.846 19.5606 16.8434 19.0106 15.705 18.6063C14.5666 18.2021 13.3316 18 12 18C10.6684 18 9.42911 18.1979 8.282 18.5937C7.13511 18.9894 6.13689 19.5437 5.28733 20.2563C6.154 21.0034 7.18211 21.5919 8.37167 22.0217C9.56144 22.4517 10.7709 22.6667 12 22.6667ZM12 11.3333C12.7487 11.3333 13.3803 11.0761 13.895 10.5617C14.4094 10.047 14.6667 9.41533 14.6667 8.66667C14.6667 7.918 14.4094 7.28633 13.895 6.77167C13.3803 6.25722 12.7487 6 12 6C11.2513 6 10.6197 6.25722 10.105 6.77167C9.59056 7.28633 9.33333 7.918 9.33333 8.66667C9.33333 9.41533 9.59056 10.047 10.105 10.5617C10.6197 11.0761 11.2513 11.3333 12 11.3333Z"
              fill={fillColor}
            />
          </g>
          <defs>
            <clipPath id="clip0_318_74">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
  }
}
