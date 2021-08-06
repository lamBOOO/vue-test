import React, { Component, useState, useRef, createRef } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Line } from 'react-chartjs-2';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart } from 'chart.js';

const AmazonAffiliateData = [
  {
    link: "https://www.amazon.de/dp/B01HDNUXBW?&linkCode=ll1&tag=gradescaler-21&linkId=9a7ff66540ed90e55e70bd7448a90778&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01HDNUXBW&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=&language=de_DE",
    title: "Hagomoro Chalk",
    bullets: [
      "made in Japan",
      "no dust",
      "less friction",
    ]
  },
  {
    link: "https://www.amazon.de/Logitech-Wireless-Presenter-Cordless-Timer/dp/B002L3TSLQ?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=lehrer&qid=1628170061&sr=8-33&linkCode=ll1&tag=gradescaler-21&linkId=b3a4a7a9f83221ed0e9211e832ce22e0&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B002L3TSLQ&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Logitech R400 Presenter",
    bullets: [
      "absolute must have",
      "only 12€"
    ]
  },
  {
    link: "https://www.amazon.de/Bose-Noise-Cancelling-Headphones-Schwarz/dp/B07Q9MJKBV?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=bose+g700&qid=1628170522&sr=8-5&linkCode=ll1&tag=gradescaler-21&linkId=ba3f083d6bb4ab0ce4020cb2495d7876&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07Q9MJKBV&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Bose Noise Cancelling Headphones 700",
    bullets: [
      "work everywhere",
      "noise cancelling",
      "best audio qual.",
    ]
  },
  {
    link: "https://www.amazon.de/Dell-S2721QS-Zoll-curved-entspiegelt/dp/B08FRJ9RJ9?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=27+4k&qid=1628170292&sr=8-9&linkCode=ll1&tag=gradescaler-21&linkId=a081f7b1aea61837d1d9d82858ca9771&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08FRJ9RJ9&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Dell S2721QS 27 Zoll 4K UHD",
    bullets: [
      "27 inch allow multiple documents dide-by-side",
      "4K is crispy clear w.o. the need to zoom",
    ]
  },
  {
    link: "https://www.amazon.de/How-Write-Lot-Practical-Productive/dp/1591477433?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=how+to+write+a+lot&qid=1628119204&sr=8-4&linkCode=ll1&tag=gradescaler-21&linkId=37040218eabc21613164d85302938e0e&language=de_DE&ref_=as_li_ss_tl",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=1591477433&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "A Practical Guide to Productive Academic Writing",
    bullets: [
      "good guide for writers",
    ]
  },
  {
    link: "https://www.amazon.de/gp/product/B07L5GDTYY/ref=as_li_tl?ie=UTF8&tag=gradescaler-21&camp=1638&creative=6742&linkCode=as2&creativeASIN=B07L5GDTYY&linkId=4d7cb619629ee981e5d8900478a97050",
    imlink: "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07L5GDTYY&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=gradescaler-21&language=de_DE",
    title: "Kindle Oasis",
    bullets: [
      "read you papers everywhere",
      "handy backlight for bed",
    ]
  },
]

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' render={(props) => <App {...props} />} />
      <Route path='/input=:input' render={(props) => <App {...props} />} />
    </Switch>
  </BrowserRouter>
);

class App extends Component {
  constructor(props) {
    super(props);
    const defaultData = {
      showerror: false,
      gradeScheme: [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0, 5.0],
      gradeFrequency: null,
      gradeRanges: null,
      average: null,
    }
    const { input } = props.match.params;
    if (input != null) {
      this.state = {
        input: JSON.parse(input),
        data: {
          showerror: false
        }
      }
    } else {
      // default
      this.state = {
        input: {
          points: [0, 0.5, 0.5, 1, 2, 13, 23, 12, 15, 27, 35, 37, 37, 37, 40, 40, 40, 40, 32, 30, 25, 40, 50, 49, 46, 35, 38, 38, 38, 38, 38, 38, 43, 43, 43, 33, 33, 33, 28, 28, 26, 38.5],
          maxpts: 50,
          roof: 50,
          base: 25,
          roundingMultiplier: 0.5,
        },
        data: {
          showerror: false
        }
      };
    }
    this.data = defaultData;
  }

  calculateGrade = (pts) => {
    const grades = this.data.gradeScheme
    const ranges = this.data.gradeRanges
    if (grades != null) {
      for (var i = 0; i < ranges.length; i++) {
        if (pts >= ranges[ranges.length - i - 1]) {
          return grades[i]
        }
      }
    }
    return "error"
  }

  roundm(x, multiple) {
    return Math.round(x / multiple) * multiple;
  }

  updateData() {
    // grade ranges
    const diff = parseFloat(this.state.input.roof) - parseFloat(this.state.input.base)
    const gradeRangesExact = [0].concat(
      [...Array(10).keys()].map(x => parseFloat(this.state.input.base) + 0.1 * (x) * diff)
    )
    const gradeRanges = gradeRangesExact.map(
      x => this.roundm(x, this.state.input.roundingMultiplier)
    )
    this.data.gradeRanges = gradeRanges;

    // grade frequcencies
    const gradeDict = this.state.input.points.map(pts => this.calculateGrade(pts))
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const gradeFrequency = this.data.gradeScheme.map(gr => countOccurrences(gradeDict, gr))
    this.data.gradeFrequency = gradeFrequency;

    // average
    const weightedSumArray = this.data.gradeFrequency.map(
      (e, i) => this.data.gradeScheme[i] * e
    );
    const numParticipants = this.data.gradeFrequency.reduce((a, b) => a + b, 0)
    const weightedSum = weightedSumArray.reduce((a, b) => a + b, 0)
    const average = weightedSum / numParticipants;
    this.data.average = average.toPrecision(3);
  }

  validateInput() {
    return (
      !isNaN(parseFloat(this.state.input.maxpts)) &&
      !isNaN(parseFloat(this.state.input.roof)) &&
      !isNaN(parseFloat(this.state.input.base)) &&
      !isNaN(parseFloat(this.state.input.roundingMultiplier)) &&
      true
    )
  }

  render() {
    let link = document.createElement('meta');
    link.setAttribute('property', 'og:image');
    link.content = "https://www.google.de/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    document.getElementsByTagName('head')[0].appendChild(link);
    if (
      !this.state.data.showerror &&
      this.validateInput()
    ) {
      this.updateData()
    }
    return (
      <BrowserRouter>
        <Header />
        <div className="p-0 m-0">
          <Container className="">
            <Row>
              {/* <Col sm={9} md={10} lg={10}> */}
              <Col>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">⚙️ Settings & Input</h2>
                  <Container className="m-0 p-2">
                    <Row>
                      <Col>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon1">💯 Max.</InputGroup.Text>
                          <FormControl
                            value={this.state.input.maxpts}
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, maxpts: event.target.value } })
                            }}
                          />
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon1">🥸 Roof</InputGroup.Text>
                          <FormControl
                            value={this.state.input.roof}
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, roof: event.target.value } })
                            }}
                          />
                          <input
                            type="range" className="form-range" min={this.state.input.base} max={this.state.input.maxpts} step={this.state.input.roundingMultiplier} id="customRange3" value={this.state.input.roof}
                            onChange={event => {
                              this.setState({ input: { ...this.state.input, roof: event.target.value } })
                            }}
                            disabled = {this.state.data.showerror}
                          ></input>
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon1">🥳 Base</InputGroup.Text>
                          <FormControl
                            value={this.state.input.base}
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, base: event.target.value } })
                            }}
                          />
                          <input
                            type="range" className="form-range" min="0" max={this.state.input.roof} step={this.state.input.roundingMultiplier} id="customRange4" value={this.state.input.base}
                            onChange={event => {
                              this.setState({ input: { ...this.state.input, base: event.target.value } })
                            }}
                            disabled = {this.state.data.showerror}
                          ></input>
                        </InputGroup>
                        <InputGroup className="mb-1 p-0">
                          <InputGroup.Text id="basic-addon1">🔗 Round</InputGroup.Text>
                          <FormControl
                            value={this.state.input.roundingMultiplier}
                            onChange={event => {
                              this.checkInputForPositiveNumericValue(event.target.value)
                              this.setState({ input: { ...this.state.input, roundingMultiplier: event.target.value } })
                            }}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <InputGroup className="">
                          <InputGroup.Text>Input</InputGroup.Text>
                          <FormControl
                            as="textarea"
                            style={{ height: '175px' }}
                            placeholder={this.state.input.points.join(" \n")}
                            onChange={event => {
                              this.handlePointsInput(event.target.value)
                            }}
                          />
                        </InputGroup>
                        <div className="text-center">
                          <Button className="btn-sm m-1" variant="danger" onClick={() => { window.location.href = "/" }}>
                            ☢️ Reset
                          </Button>
                          <CopyButtonWithOverlay copyUrl={window.location.protocol + "//" + window.location.host + '/input=' + JSON.stringify(this.state.input)} />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  {
                    this.state.data.showerror
                      ?
                      <div className="text-center d-flex justify-content-center">
                        <Alert className="m-2" key="warn" variant="danger">
                          <Alert.Heading>🚨 Error in input field.</Alert.Heading>
                          {/* <p> */}
                          <ul className="text-start">
                            <li>"Max", "Roof", "Base", "Round" have to be positive numbers.</li>
                            <li>Only numeric values are allowed.</li>
                            <li>Decimal separator can be point or comma.</li>
                            <li>The list separator must be any whitespace or a newline.</li>
                          </ul>
                          {/* </p> */}
                          <hr />
                          <p className="mb-0">
                            ➡️ If you don't know how to fix it, reset the whole app and start again.
                          </p>
                        </Alert>
                      </div>
                      :
                      ''
                  }
                </div>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">📉 Results</h2>
                  <Container fluid>
                    <Row>
                      <Col md={6}>
                        <h3 className="fs-6 text-center">Graphical data</h3>
                        {/* <i className="bi bi-cart-fill"></i> */}
                        <GradeFreqBarChart
                          labels={this.data.gradeScheme}
                          data={this.data.gradeFrequency}
                        />
                        <GradeRangesLineChart
                          points={this.state.input.points}
                          gradeRange={this.data.gradeRanges}
                          gradeScheme={this.data.gradeScheme}
                          maxpts={this.state.input.maxpts}
                        />
                      </Col>
                      <Col md={6}>
                        <h3 className="fs-6 text-center">Indicators</h3>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>👩‍👩‍👦‍👦 Num</th>
                              <th>📊 Average</th>
                              <th>😰 Failing Rate</th>
                              <th>🥳 Percentage to pass</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{this.data.gradeFrequency.reduce((a, b) => a + b, 0)}</td>
                              <td>{this.data.average}</td>
                              <td>{
                                (100 * this.data.gradeFrequency[this.data.gradeFrequency.length - 1] / this.data.gradeFrequency.reduce((a, b) => a + b, 0)).toPrecision(3)
                              } %</td>
                              <td>{(100 * this.data.gradeRanges[1] / this.state.input.maxpts).toPrecision(3)} %</td>
                            </tr>
                          </tbody>
                        </Table>
                        <h3 className="fs-6 text-center">Tabular data</h3>
                        <DataTable gradeScheme={this.data.gradeScheme} gradeRanges={this.data.gradeRanges} gradeFrequencies={this.data.gradeFrequency} maxpts={this.state.input.maxpts}/>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">📚 About</h2>
                  <Container className="">
                    <Row><Col>
                      Grade Scaler calculates grading schemes with adaptive failing and passing rates and presents graphical exam statistics. Since exams change from semester to semester, the grading scheme sometimes has to be adapted to account for, e.g., overly hard exam questions. Grade Scaler transforms a list of exam points into a corresponding grade mapping by applying a variables exam passing rate (<i>Base</i>) and a variable best grade rate (<i>Roof</i>).
                    </Col></Row>
                  </Container>
                </div>
                <div className="">
                  <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">🙏 Support / Feedback</h2>
                  <Container className="">
                    <Row><Col>
                      Support me by clicking any of the teacher must-have products or <a href="https://www.buymeacoffee.com/theisen">buy me a coffee</a>! For feedback, just write me an e-mail. 🙂
                    </Col></Row>
                  </Container>
                </div>
              </Col>
              <Col sm={12} md={12} lg={12} xl={4} xxl={3}>
                <h2 className="rounded border shadow-sm fs-4 fw-bold m-2 text-center">🧑‍🏫 Teacher's Must-Havs</h2>
                <AmazonLinkCards data={AmazonAffiliateData} />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </BrowserRouter>
    )
  }





  checkInputForPositiveNumericValue(inputString) {
    if (inputString === "") {
      this.setState({ data: { ...this.state.data, showerror: true } })
    } else {
      if (isNaN(inputString)) {
        this.setState({ data: { ...this.state.data, showerror: true } })
      } else {
        if (parseFloat(inputString) < 0) {
          this.setState({ data: { ...this.state.data, showerror: true } })
        } else {
          this.setState({ data: { ...this.state.data, showerror: false } })
        }
      }
    }
  }

  handlePointsInput(inputString) {
    inputString = inputString.replaceAll(',', '.')
    const pts = inputString.split(/\s+/)
    if (pts.some(isNaN)) {
      this.setState({ data: { ...this.state.data, showerror: true } })
    } else {
      this.setState({ data: { ...this.state.data, showerror: false } })
      this.setState({ input: { ...this.state.input, points: pts } })
    }
  }

  renderCopyMessage = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

class AmazonLinkCards extends React.Component {
  render() {
    return (
      <div className="m-1 row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-2 g-3">
        {
          this.props.data.map(
            (prod) =>
              <AmazonLinkCard
                key={prod.link}
                link={prod.link}
                imlink={prod.imlink}
                title={prod.title}
                bullets={prod.bullets}
              />
          )
        }
      </div>
    )
  }
}

class AmazonLinkCard extends React.Component {
  render() {
    return (
      <div className="m-0 p-2">
        <Card className="">
          <a href={this.props.link}><Card.Img variant="top" src={this.props.imlink} alt={this.props.title + " Image"} /></a>
          <Card.Body>
            <div className="">
              <strong><small>{this.props.title}</small></strong>
              <ListGroup className="m-0 p-0 fs-sm" variant="flush">
                {
                  this.props.bullets.map(
                    bul => <ListGroup.Item key={bul} className="m-0 p-0"><small>{bul}</small></ListGroup.Item>
                  )
                }
              </ListGroup>
            </div>
            <Button className="btn-sm" variant="outline-primary" target="_blank" href={this.props.link}>😍 Get it!</Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

class GradeFreqBarChart extends React.Component {
    constructor(props) {
      super(props)
      this.gradeFreqBarChartRef = createRef();
      this.data = {
        labels: props.labels,
        datasets: [
          {
            // label: 'Grade Distribution',
            data: props.data,
            backgroundColor: [
              '#0d6efd'
            ],
            borderColor: [
              'rgba(0, 0, 0)',
            ],
            borderWidth: 1,
          },
        ],
      };
      this.options = {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Points',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Grade',
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
        animation: false,
      };

    }
    render() {
      return (
        // <Bar ref={this.gradeFreqBarChartRef} data={this.data} options={this.options} />
        <div>
          <canvas id="myChart"></canvas>
        </div>
      );
    }
    componentDidMount() {
      var myChart = new Chart(
        document.getElementById('myChart'),
        {
          type: 'bar',
          data: this.data,
          options: this.options,
        }
      );
      myChart.update();

      // document.querySelector('meta[property="og:image"]').setAttribute("content", "https://www.google.de/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");

    }
}

class GradeRangesLineChart extends React.Component {
  render() {
    const plotData = this.props.gradeRange.map(
      (e, i) => {
        return ({ "x": e, "y": this.props.gradeScheme[this.props.gradeScheme.length - 1 - i] });
      }
    ).concat({ "x": this.props.maxpts, "y": 1 })

    const pts = this.props.points;
    const frequencyDict = {};
    for (let i=0; i<pts.length; i++) {
      if (frequencyDict[pts[i]] > 0) {
        frequencyDict[pts[i]] = frequencyDict[pts[i]]+1;
      } else {
        frequencyDict[pts[i]] = 1;
      }
    }
    const frequencyArray = Object.values(frequencyDict).map(
      (freq) => parseInt(freq)
    );
    const maxFreq = Math.max(...frequencyArray);
    const scatterData = [];
    for (const [key, value] of Object.entries(frequencyDict)) {
      for (let i=0; i < value; i++) {
        scatterData.push(
          {
            x: key,
            // map to the range [1,5]
            y: this.props.gradeScheme[this.props.gradeScheme.length-1] - (i / maxFreq/2) * (this.props.gradeScheme[this.props.gradeScheme.length-1] - this.props.gradeScheme[1])
          }
        )
      }
    }

    const data = {
      datasets: [
        {
          type: "line",
          data: plotData,
          stepped: true,
          backgroundColor: [
            '#0d6efd'
          ],
          borderColor: [
            'rgba(0, 0, 0)',
          ],
          borderWidth: 1,
        },
        {
          type: "scatter",
          data: scatterData,
          // stepped: true,
          backgroundColor: [
            'red'
          ],
          // borderColor: [
          //   'rgba(0, 0, 0)',
          // ],
          // borderWidth: 1,
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          display: true,
          title: {
            display: true,
            text: 'Points',
          },
        },
        yAxes:
          {
            title: {
              display: true,
              text: 'Grades',
            },
            reverse: true,
          },
      },
      animation: false,
    };
    return (
      <Line data={data} options={options} />
    )
  }
}

function CopyButtonWithOverlay(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className="m-1 btn-sm p-1" variant="primary" ref={target} onClick={() => {
        navigator.clipboard.writeText(encodeURI(props.copyUrl))
        setShow(true)
        setTimeout(() => { setShow(false); }, 2000);
      }
      }>
        ✉️ Copy link
      </Button>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            ✅ Copied link into clipboard!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

class Header extends Component {
  render() {
    return (
      <h1 className="fs-1 fw-bold border-bottom pb-2 text-center">
        {/* <img style={{ height: '24px' }} src="favicon.ico" alt="Logo" /> */}
        ✍️  Grade Scaler <Badge bg="primary">v1</Badge>
      </h1>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="p-3 text-center border-top">
        <div className="">🇩🇪 Made in Germany by Lambert Theisen</div>
        <div className="">🇪🇺 100% EU GDPR compliant (serverless)</div>
        <LegalButton />
        <Button className="btn-sm p-0" variant="success" href="https://www.buymeacoffee.com/theisen">☕️ Buy me a coffee</Button>
      </div>
    )
  }
}

function LegalButton() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button className="btn-sm p-0" onClick={handleClick}>
        🧑‍⚖️ Legal info / Impressum
      </Button>
      <Overlay
        show={show}
        target={target}
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header>
            Legal info
          </Popover.Header>
          <Popover.Body>
            <strong>
              Impressum
            </strong>
            <br></br>
            Lambert Theisen<br></br>
            Hochbrück 4<br></br>
            D-52070 Aachen<br></br>
            Germany<br></br>
            poldi.icq(at)arcor.de<br></br>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

class DataTable extends Component {
  render() {
    const gradeScheme = this.props.gradeScheme;
    let tmpRanges = this.props.gradeRanges;
    tmpRanges.push(this.props.maxpts);
    const gradeRanges = this.props.gradeRanges;
    const gradeFrequencies = this.props.gradeFrequencies;
    const totalParticipants = gradeFrequencies.reduce((a, b) => a + b, 0)
    const tableBody = gradeScheme.map(
      (e, i) => <tr key={i}>
        <td key={i + 1}>{e}</td>
        <td key={i + 2}>{parseFloat(gradeRanges[gradeRanges.length - 2 - i]).toPrecision(3)}</td>
        <td key={i + 3}>{parseFloat(gradeRanges[gradeRanges.length - 1 - i]).toPrecision(3)}</td>
        <td key={i + 4}>{gradeFrequencies[i]}</td>
        <td key={i + 5}>{(100 * gradeFrequencies[i] / totalParticipants).toPrecision(3)} %</td>
      </tr>
    )
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr key="a">
              <th key="1">Grade</th>
              <th key="2">≥</th>
              <th key="3">&lt;</th>
              <th key="4" colSpan="2">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'))
