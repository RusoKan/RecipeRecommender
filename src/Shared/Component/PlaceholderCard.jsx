import Card  from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import "./PlaceholderCard.css"
function PlaceholderCard(props) {
   return <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" animation="glow" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Solid_grey.svg/2048px-Solid_grey.svg.png" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
    
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button   className="PlaceHolderButton"  xs={6} />
        </Card.Body>
      </Card>
}
export default PlaceholderCard