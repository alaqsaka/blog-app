import { User } from "./columns";

interface CellActionProps {
  data: User;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div>
      <p>Create Post</p>
      <p>Update User</p>
      <p>Delete User</p>
    </div>
  );
};

export default CellAction;
