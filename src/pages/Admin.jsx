import SubHeader from "../components/SubHeader"
import ProductTable from "../components/ProductTable"
import data from "../utils/data.json"


const Admin = () => {
  const handleEdit = (id) => {
    console.log('Edit', id)
  }

  const handleDelete = (id) => {
    console.log('Delete', id)
  }

  return (
    <div className="min-h-screen pt-20">
        <SubHeader title={"Panel de Administración"}/>
        <ProductTable data={data} onEdit={handleEdit} onDelete={handleDelete}/>
    </div>
  )
}

export default Admin