
import useStore from "../../services/useStore";

const AdminHome = () => {
    const {admin} = useStore()
    return (
        <div className="bg-white p-4 rounded-md">
            <div>
                <h3 className="font-bold text-lg mb-2">Dashboard</h3>
                <span className="text-sm text-gray-400">Overview of your store</span>
            </div>
            <div>
                <span>Welcome Admin {admin?.name}</span>
            </div>
        </div>
    );
};

export default AdminHome;
