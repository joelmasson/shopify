import { EmptyState, Layout, Page, ResourcePicker } from '@shopify/polaris';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

class Index extends React.Component {
    state = {open:false};
    render() {
        const emptyState = !store.get('ids');
        return (
            <Page 
                primaryAction={{
                    content:'Select products',
                    onAction:()=>this.setState({open:true})
                }}
            >
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={this.state.open}
                    onSelection={(resources) => this.handleSelection(resources)}
                    onCancel={() => this.setState({open:false})}
                />
                {emptyState ? (
                <Layout>
                    <EmptyState
                        heading="Discount you products temporarily"
                        action={{content:'Select Products',onAction: () => this.setState({open:true}),}}
                        image="https://cdn.shopify.com/s/files/1/077/9955/files/empty-state.svg"
                    >
                        <p>Select products to change their price temporarily</p>
                    </EmptyState>
                    <ResourceListWithProducts />
                </Layout>
                ) : (
                    <ResourceListWithProducts />
                )}
            </Page>
        )
    }
    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id);
        this.setState({open:false})
        store.set('ids',idsFromResources);
    }
};

export default Index;