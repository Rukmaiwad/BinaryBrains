/**
 * File contains the private route to check whether the user is logged in or not.
 */

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getToken, removeUser } from '@/redux/slices/User';
import { isInvalid } from '@/utils/utils';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: (props: any) => any = () => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(getToken);

    if(isInvalid(token)) {
        dispatch(removeUser())
        return <Navigate to={'/login'}/>
    }
    return <Outlet/>
}

export default PrivateRoute