const LockIcon = ({ locked }: { locked: boolean }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='white'
        className='w-4 h-4'
    >
        {locked ? (
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5v-2a4.5 4.5 0 10-9 0v2m-1.5 0h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
            />
        ) : (
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5v-2a4.5 4.5 0 10-9 0v2m-1.5 0h12a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-12a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
            />
        )}
    </svg>
);

export default LockIcon;
