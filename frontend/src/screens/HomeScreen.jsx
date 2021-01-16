import React from 'react'
import projects from '../products'
import Products from './../components/Products'
import { Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {projects.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
