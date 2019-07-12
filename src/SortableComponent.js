import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move"
import Papa from 'papaparse'
import FileSaver, {saveAs} from 'file-saver'
import logo from './images/logo.png'
import {
    Jumbotron,
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
    Card,
    CardBody,
    CardGroup,
    CardImg,
    CardTitle,
    CardText,
    CardSubtitle,
    Label,
} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './SortableComponent.scss'


class SortableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // items: ["A", "B", "C", "D","E", "F", "G", "H","I", "J", "K", "L"]
            items: [], // DATA IS INSTANTIATED
            // exportData: [],
            isOpen: false,
            isVisible: false,
        }
        this.toggle = this.toggle.bind(this) 
        this.toggleVisible = this.toggleVisible.bind(this) 
        this.updateData = this.updateData.bind(this)
        this.parse = this.parse.bind(this)
        this.unparse = this.unparse.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }

    toggleVisible() {
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    updateData(results) {
      const items = results.data // THE PARSED CONTENTS OF INPUT ARE ASSIGNED TO DATA
      this.setState({items})  // AND STUCK IN STATE.DATA !!!!!!!!!!!!!!
  }
           
    parse(event) {
        event.preventDefault()
        const inventory = event.target.files[0]
        Papa.parse(inventory, {
            header: true,
            complete: this.updateData
        })
        this.toggleVisible()
    }

    // unparse = () => {
    //   // const thing = this.state.items    
    //   // const csv = thing.filter((item => (
    //   //   item.config_sku
    //   // )))   // undefined
    //   // const csv = this.state.items.config_sku   // undefined
    //   // const items = this.state.items // renders all of it
    //   // csv = Papa.parse(csv)
    //   // const csv = this.setState({items: this.state.items.map(item => item.config_sku)})   // undefined     
    //   // // const csv = this.state.items.map(item => item.config_sku)
    //   // // const csv = Papa.unparse(this.state.items) 
    //   // // const csv = Papa.unparse(this.state.items) 
    //   // const items = this.state.items
    //   // console.log(typeof(items))     
    //   // const csv = Papa.parse(this.state.items.filter(item => item.config_sku))
    //   // const csv = Papa.parse(this.state.items.map(item => item.config_sku))
      
    //   let csv = this.state.items.map((item) =>
    //     ( item.config_sku )
    //   )   // [undefined      
    //   console.log(typeof(csv))
    //   console.log(csv)
    //   var file = new File([
    //     csv
    //   ], "neworder.csv", {type: "text/plain;charset=utf-8"});
    //   FileSaver.saveAs(file);
    // }   

    unparse = (event) => {
      const csv = Papa.unparse(this.state.items) 
      var file = new File([
        csv
      ], "neworder.csv", {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(file);
    }  

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  }

  importButton = () => (
    <div className="import">
        <h4> GO App </h4> 
        <p className="summary" >Welcome to the Grid Order Application. Please upload a properly formatted Custom Export from Magento. And reorder the tiles in the UI.</p>                    
        <Input type="file" onChange={this.parse}  />
    </div>
)

exportButton = () => (
  <div className="exportButton">
      <h4> Export CSV </h4>
      <p className="summary" >Now that you have the New Order, export the file. And upload it into the Magento Custom Module. This will change the grid order.</p>
      <Button onClick={this.unparse} color="secondary" size="sm">Save New Order</Button>        
  </div>
)

// newindex = (e) => {
//   index = e
// }

  render() {
    return (
        <Container>
          <Navbar color="light" light expand="md">
                    <NavbarBrand className="logo" href="/"> 
                        <img src={logo} alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                        </NavItem>
                        <NavItem>
                            <NavLink target="_blank" href="https://github.com/dylannirvana/neworder/issues">Register issues here</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            How to use
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem target="_blank" href="https://github.com/dylannirvana/neworder" >
                                        The GO App is an Agile application that allows you to resequence sections of the product grid order using a visual tool.
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

            <Jumbotron >
              { !this.state.isVisible ? this.importButton() : null }
              { this.state.isVisible ? this.exportButton() : null }
            </Jumbotron>

            {/* THIS IS WHERE THE ITE MS OBJECT GETS ITERATED */}
            <SortableList 
                items={this.state.items} // THIS IS THE DUPLICATE SET STATE HERE !!!!!!!!!!!!!!!!!!!!!!!!!!
                onSortEnd={this.onSortEnd}
                axis="xy"
                lockToContainerEdges={true}
            />
        </Container>
      
    );
  }
}

// let something = [];

// THIS IS THE INDIVIDUAL ITEM OBJECT
const SortableItem = SortableElement(({ value, index }) => ( // value is being populated by SortableList map function
    

    
    <Card
      style={{
        width: 200,
        height: 246,
        // backgroundColor: "hotpink",
        border: "1px solid black",
        textAlign: "center",
        margin: 10,
        cursor: "move",
        color: "black",
        fontSize: 24
      }}
    >
            <CardTitle> {value.name} </CardTitle>
            <CardSubtitle> {value.config_sku} </CardSubtitle>
            <CardImg src={value.image}></CardImg>
            <CardText> {value.designer} </CardText>
            <CardText> {index} </CardText>
            
            







            

            {/* {value} */}            

            {/* {value}
            {index} */}

           
            {/* { something = {index} }
            {console.log(something)} */}

      
            {/* {console.log({value})} */}
            {/* {console.log(value.config_sku, index)} */}


            {/* { this.setState({exportData:value.config_sku, index}) }
            { console.log(this.state.exportData) } */}

            {/* { setState = value.config_sku }
            {console.log(this.egg)} */}



            {/* {this.setState(({ exportData }) => ({
              exportData: [value.config_sku, index]
            }))} */}
            {/* {console.log(this.exportData)} */}
    </Card>
  ));
  
  const SortableList = SortableContainer(({ items }) => {
    return (
      <section className="center-the-grid">
        <div 
                style={{
                // backgroundColor: "lime",
                // width: 800, // by removing this, children cards will fill container to 5,4,3 across depending on window width
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                // textAlign: "left"
                }}
            >
                {items.map((value, index) => (
                
                <SortableItem key={`item-${index}`} index={index} value={value}> 
                  
                </SortableItem>
                ))}
            </div>
      </section>

    //    <section className="center-the-grid"
    //            style={{
    //            // backgroundColor: "lime",
    //            width: 800,
    //            display: "flex",
    //            flexWrap: "wrap",
    //            justifyContent: "center",
    //            // textAlign: "left"
    //            }}
    //        >
    //            {items.map((value, index) => (
               
    //            <SortableItem key={`item-${index}`} index={index} value={value}> 
                 
    //            </SortableItem>
    //            ))}
           
    //  </section>

            
    );
  });
  

export default SortableComponent

