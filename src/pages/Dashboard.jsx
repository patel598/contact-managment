import ContactsList from '../components/ContactsList'
import MetaTag from '../components/meta'

const Dashboard = () => {
    return (
        <>
            <title>Dashboard</title>
            <MetaTag
                keyword="react, contact, management"
                description="This is a contact management app that allows you to add, edit, update, and delete contacts."
            />
            <ContactsList />
        </>
    )
}

export default Dashboard