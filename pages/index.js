/* eslint-disable @next/next/no-img-element */
import { Row, Col, Card } from 'react-bootstrap'
import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardListItem from 'components/CardListItem'

export default function Home() {
  return (
    <PageLayout>
      <AuthorIntro />
      <hr/>
      {/* className from props */}
      <Row className="mb-5">
        <Col md="10">
          <CardListItem />
        </Col>

        <Col md="4">
          <Card className={`fj-card`}>
            <div className="card-body-wrapper">
              <Card.Header
                className="d-flex flex-row">
                <img
                  src={'https://via.placeholder.com/150'}
                  className="rounded-circle mr-3"
                  height="50px"
                  width="50px"
                  alt="avatar"/>
                <div>
                  <Card.Title className="font-weight-bold mb-1">Placeholder Author</Card.Title>
                  <Card.Text className="card-date">Placeholder Date</Card.Text>
                </div>
              </Card.Header>
              <div className="view overlay">
                <Card.Img
                  src='https://via.placeholder.com/250'
                  alt="Card image cap"
                />
              </div>
              <Card.Body>
                <Card.Title className="card-main-title">Placeholder Title</Card.Title>
                <Card.Text>Placehodler Subtitle</Card.Text>
              </Card.Body>
            </div>
            <a className="card-button">
              Read More
            </a>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
