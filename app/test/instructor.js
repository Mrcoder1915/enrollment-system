import boyImg from './images/boy.png'
import girlImg from './images/girl.png'

const UserCard = ({ gender = 'boy' }) => {
  const avatar = gender === 'girl' ? girlImg : boyImg;

  return (
    <div className="flex items-center bg-red-800 text-white p-4 rounded-md border border-white w-[300px]">
      <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full mr-3 object-cover" />
      <span className="text-2xl pl-2">Janine D.</span>
    </div>
  );
};

export default UserCard;