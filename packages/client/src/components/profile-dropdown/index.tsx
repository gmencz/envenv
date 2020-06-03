import React from 'react';
import {
  StyledProfileDropdown,
  StyledDivider,
  StyledProfileDropdownImage,
  ProfileDropdownLink,
} from './styles';
import { useAuth } from '../../hooks/use-auth';
import { Loader } from '../loader';
import { AppLink } from '../link';
import { Paragraph } from '../paragraph';
import { Button } from '../button';

interface ProfileDropdownProps {
  reference:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  open: boolean;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  reference,
  open,
}) => {
  const { whoAmI } = useAuth();

  const mounted = React.useRef(true);
  React.useEffect(() => {
    if (mounted.current) {
      whoAmI.execute();
    }
    return () => {
      mounted.current = false;
    };
  }, [whoAmI]);

  return whoAmI.loading ? (
    <StyledProfileDropdown open={open} ref={reference} className='centered'>
      <Loader size='20px' />
    </StyledProfileDropdown>
  ) : (
    <StyledProfileDropdown open={open} ref={reference}>
      <ProfileDropdownLink to='/profile'>
        {whoAmI.data?.me.username}
      </ProfileDropdownLink>
      <StyledDivider />
      <ProfileDropdownLink to='/environments'>
        <svg
          width='15'
          height='15'
          viewBox='0 0 20 19'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.9363 17.2295C10.3293 17.2819 9.74733 17.3096 9.24481 17.3096C6.2988 17.3096 2.33049 16.5592 2.33049 15.352V13.8243C4.15837 14.8293 6.79441 15.1573 9.24481 15.1573C9.53752 15.1573 9.83281 15.1521 10.1272 15.1416C10.0754 14.6593 10.0962 14.183 10.2386 13.6296C9.88634 13.6491 9.55047 13.6595 9.24481 13.6595C6.2988 13.6595 2.33049 12.9099 2.33049 11.7027V9.93233C4.1575 10.9366 6.79441 11.2653 9.24481 11.2653C10.1264 11.2653 11.0304 11.2204 11.9119 11.1186C13.5611 9.79603 15.8863 9.47625 17.8722 10.1967V4.10073C17.8722 1.58296 12.7218 0.834076 9.24481 0.834076C5.59684 0.834076 0.603638 1.58371 0.603638 4.09998V15.5408C0.603638 18.0585 5.96466 18.8074 9.24481 18.8074C10.1782 18.8074 11.2816 18.743 12.3834 18.597C11.8057 18.2263 11.3136 17.762 10.9363 17.2295ZM9.24481 2.33185C12.386 2.33185 16.1453 3.01259 16.1453 4.09998C16.1453 5.28397 11.7384 5.86811 9.24481 5.86811C6.2988 5.86886 2.33049 5.19036 2.33049 4.09998C2.33049 2.91374 6.4853 2.33185 9.24481 2.33185ZM2.33049 6.03361C4.15837 7.03862 6.79441 7.36663 9.24481 7.36663C11.6874 7.36663 14.3183 7.03862 16.1453 6.03361V7.80998C16.1453 9.12278 11.7151 9.76757 9.24481 9.76757C6.28671 9.76682 2.33049 9.01344 2.33049 7.80923V6.03361ZM15.7136 11.3185C13.5697 11.3185 11.8282 12.8275 11.8282 14.6885C11.8282 16.5495 13.5697 18.0585 15.7136 18.0585C17.8575 18.0585 19.599 16.5495 19.599 14.6885C19.599 12.8275 17.8575 11.3185 15.7136 11.3185ZM14.7604 16.8176L15.7766 14.9117L14.2751 15.2652L15.5409 12.993L16.7385 12.6987L15.9476 14.1403L17.7288 13.7232L14.7604 16.8176Z'
            fill='#4B4B4B'
          />
        </svg>
        Your environments
      </ProfileDropdownLink>

      <ProfileDropdownLink to='/settings'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='15'
          height='15'
          viewBox='0 0 24 24'
        >
          <path d='M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z' />
        </svg>
        Settings
      </ProfileDropdownLink>
      <StyledDivider />
      <StyledProfileDropdownImage>
        <img src={whoAmI.data?.me.picture || ''} alt={whoAmI.data?.me.name} />
        <div>
          <Paragraph color='#000'>{whoAmI.data?.me.name}</Paragraph>
          <AppLink to='/profile'>View profile</AppLink>
        </div>
      </StyledProfileDropdownImage>
      <ProfileDropdownLink to='/profile/usage'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='15'
          height='15'
          viewBox='0 0 25 25'
        >
          <path d='M6 18h-2v5h-2v-5h-2v-3h6v3zm-2-17h-2v12h2v-12zm11 7h-6v3h2v12h2v-12h2v-3zm-2-7h-2v5h2v-5zm11 14h-6v3h2v5h2v-5h2v-3zm-2-14h-2v12h2v-12z' />
        </svg>
        Account usage
      </ProfileDropdownLink>
      <StyledDivider />
      <Button component='button'>
        <svg
          width='15'
          height='15'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
          viewBox='0 0 24 24'
        >
          <path d='M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z' />
        </svg>
        Logout
      </Button>
    </StyledProfileDropdown>
  );
};
