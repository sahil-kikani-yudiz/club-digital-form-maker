export function ProfileIcon() {
  return (
    <svg fill='none' height={26} strokeWidth={1.5} viewBox='0 0 24 24' width={26} xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export function EditIcon() {
  return (
    <svg width='18px' height='18px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className='dark:fill-theme'>
      <path d='M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z' />
      <path d='M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z' />
    </svg>
  )
}

export function DeleteIcon() {
  return (
    <svg
      className='dark:fill-theme'
      xmlns='http://www.w3.org/2000/svg'
      width='20px'
      height='20px'
      viewBox='0 0 52 52'
      enable-background='new 0 0 52 52'
    >
      <g>
        <path
          d='M45.5,10H33V6c0-2.2-1.8-4-4-4h-6c-2.2,0-4,1.8-4,4v4H6.5C5.7,10,5,10.7,5,11.5v3C5,15.3,5.7,16,6.5,16h39
           c0.8,0,1.5-0.7,1.5-1.5v-3C47,10.7,46.3,10,45.5,10z M23,7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v3h-6V7z'
        />
        <path
          d='M41.5,20h-31C9.7,20,9,20.7,9,21.5V45c0,2.8,2.2,5,5,5h24c2.8,0,5-2.2,5-5V21.5C43,20.7,42.3,20,41.5,20z
            M23,42c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z M33,42c0,0.6-0.4,1-1,1h-2
           c-0.6,0-1-0.4-1-1V28c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1V42z'
        />
      </g>
    </svg>
  )
}

export function ReportIcon() {
  return (
    <svg width='22px' height='22px' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' className='dark:fill-theme'>
      <title>{'report'}</title>
      <path d='M6 11h4v17h-4v-17zM22 16v12h4v-12h-4zM14 28h4v-24h-4v24z' />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg
      height='20px'
      id='Layer_1'
      viewBox='0 0 512 512'
      width='20px'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      stroke='currentColor'
      className='dark:fill-theme'
    >
      <path d='M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z' />
    </svg>
  )
}

export function ThemeIcon() {
  return (
    <svg height={20} viewBox='0 0 28 28' width={20} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path d='M18 2H7c-1.103 0-2 .897-2 2v3c0 1.103.897 2 2 2h11c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z' />
      <path d='M13 15v-2c0-1.103-.897-2-2-2H4V5c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h7v2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z' />
    </svg>
  )
}

export function BackArrow() {
  return (
    <svg height={20} viewBox='0 0 28 28' width={20} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <title />
      <g data-name='Layer 2' id='Layer_2'>
        <path d='M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z' />
      </g>
    </svg>
  )
}

export function ShareIcon() {
  return (
    <svg height={20} viewBox='0 0 28 28' width={20} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path
        d='M21,11 L21,20 C21,21.1045695 20.1045695,22 19,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,11 L5,11 L5,20 L19,20 L19,11 L21,11 Z M13,5.41421356 L13,16 L11,16 L11,5.41421356 L7.70710678,8.70710678 L6.29289322,7.29289322 L12,1.58578644 L17.7071068,7.29289322 L16.2928932,8.70710678 L13,5.41421356 Z'
        fillRule='evenodd'
      />
    </svg>
  )
}

export function PreviewIcon() {
  return (
    <svg height={20} viewBox='0 0 28 28' width={20} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <g>
        <polyline
          fill='none'
          points='   649,137.999 675,137.999 675,155.999 661,155.999  '
          stroke='#FFFFFF'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <polyline
          fill='none'
          points='   653,155.999 649,155.999 649,141.999  '
          stroke='#FFFFFF'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <polyline
          fill='none'
          points='   661,156 653,162 653,156  '
          stroke='#FFFFFF'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit={10}
          strokeWidth={2}
        />
      </g>
      <g>
        <g>
          <path d='M16,25c-4.265,0-8.301-1.807-11.367-5.088c-0.377-0.403-0.355-1.036,0.048-1.413c0.404-0.377,1.036-0.355,1.414,0.048    C8.778,21.419,12.295,23,16,23c4.763,0,9.149-2.605,11.84-7c-2.69-4.395-7.077-7-11.84-7c-4.938,0-9.472,2.801-12.13,7.493    c-0.272,0.481-0.884,0.651-1.363,0.377c-0.481-0.272-0.649-0.882-0.377-1.363C5.147,10.18,10.333,7,16,7    c5.668,0,10.853,3.18,13.87,8.507c0.173,0.306,0.173,0.68,0,0.985C26.853,21.819,21.668,25,16,25z' />
        </g>
        <g>
          <path d='M16,21c-2.757,0-5-2.243-5-5s2.243-5,5-5s5,2.243,5,5S18.757,21,16,21z M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3    s3-1.346,3-3S17.654,13,16,13z' />
        </g>
      </g>
    </svg>
  )
}

export function CopyIcon() {
  return (
    <svg height={26} viewBox='0 0 28 28' width={26} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path
        id='secondary'
        d='M16,22H6a2,2,0,0,1-2-2V6A1,1,0,0,1,6,6V20H16a1,1,0,0,1,0,2Z'
        style={{
          fill: 'rgb(44, 169, 188)'
        }}
      />
      <path
        id='primary'
        d='M19.71,5.29l-3-3A1.05,1.05,0,0,0,16,2H9A1,1,0,0,0,8,3V17a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V6A1,1,0,0,0,19.71,5.29Z'
        style={{
          fill: 'rgb(0, 0, 0)'
        }}
      />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg height={24} viewBox='0 0 28 28' width={24} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path d='M12 2a1 1 0 0 1 1 1v10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1zM5 17a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z' />
    </svg>
  )
}

export function LogoutIcon() {
  return (
    <svg height={28} viewBox='0 0 18 18' width={28} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path d='M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5' />
    </svg>
  )
}


export function AddIcon() {
  return (
    <svg height={12} viewBox='0 0 18 18' width={12} xmlns='http://www.w3.org/2000/svg' stroke='currentColor' className='dark:fill-theme'>
      <path
      id="primary"
      d="M12,20a1,1,0,0,1-1-1V13H5a1,1,0,0,1,0-2h6V5a1,1,0,0,1,2,0v6h6a1,1,0,0,1,0,2H13v6A1,1,0,0,1,12,20Z"
    />
    </svg>
  )
}