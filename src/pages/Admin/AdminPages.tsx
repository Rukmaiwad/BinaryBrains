import { Link } from 'react-router-dom'
import { AdminPagesType, adminPages } from './adminUtils'

const AdminPages = () => {
  return (
    <div className='md:p-10 flex justify-center'>
        <div className='flex flex-wrap p-4 w-5/6 justify-center'>
            {
                adminPages.map((pageDetail: AdminPagesType) => {
                    return <PageCard {...pageDetail} />
                })
            }
        </div>
    </div>
  )
}

export const PageCard = ({ icon: Icon, identifier, title, url  }: AdminPagesType) => {
    return (
        <Link to={url} className='flex border border-gray-500 m-4 justify-center flex-col rounded-2xl p-2' key={identifier} style={{ height: 170, width: 170}}>
            <div className="page-card-icon flex justify-center items-center h-4/6">
                <Icon size={60}/>
            </div>
            <div 
                className="page-card-title text-center h-1/6 flex items-center justify-center rounded-md"
                style={{ background: "linear-gradient(to right,black, rgba(251, 46, 152, 0.3), rgba(26, 148, 255, 0.3), black)"}}
            >
                <span className='text-xl'>{title}</span>
            </div>
        </Link>
    )
}
export default AdminPages