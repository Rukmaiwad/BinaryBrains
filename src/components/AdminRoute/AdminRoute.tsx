/**
 * File contains the private route to check whether the user is logged in or not.
 */

import { useAppSelector } from '@/redux/hooks'
import { getRole, getToken } from '@/redux/slices/User';
import { isInvalid } from '@/utils/utils';
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute: (props: any) => any = () => {

    const token = useAppSelector(getToken);
    const role = useAppSelector(getRole);

    if(isInvalid(token) || role === 'student') {
        return <Navigate to={'/login'}/>
    }

    return <Outlet/>
}

export default AdminRoute