import React from 'react'
import Card from '../components/Card'
import NavigationBar from '../components/Navbar/NavigationBar'
import Sidebar from '../components/Sidebar/Sidebar'
import litera_a from '../assets/semne/semn_a.JPG'
import litera_b from '../assets/semne/semn_b.JPG'
import litera_c from '../assets/semne/semn_c.JPG'
import litera_d from '../assets/semne/semn_d.JPG'
import litera_e from '../assets/semne/semn_e.JPG'
import litera_f from '../assets/semne/semn_f.JPG'
import litera_g from '../assets/semne/semn_g.JPG'
import litera_h from '../assets/semne/semn_h.JPG'
import litera_i from '../assets/semne/semn_i.JPG'
import litera_j from '../assets/semne/semn_j.JPG'
import litera_k from '../assets/semne/semn_k.JPG'
import litera_l from '../assets/semne/semn_l.JPG'
import litera_m from '../assets/semne/semn_m.JPG'
import litera_n from '../assets/semne/semn_n.JPG'
import litera_o from '../assets/semne/semn_o.JPG'
import litera_p from '../assets/semne/semn_p.JPG'
import litera_q from '../assets/semne/semn_q.JPG'
import litera_r from '../assets/semne/semn_r.JPG'
import litera_s from '../assets/semne/semn_s.JPG'
import litera_t from '../assets/semne/semn_t.JPG'
import litera_u from '../assets/semne/semn_u.JPG'
import litera_v from '../assets/semne/semn_v.JPG'
import litera_w from '../assets/semne/semn_w.JPG'
import litera_x from '../assets/semne/semn_x.JPG'
import litera_y from '../assets/semne/semn_y.JPG'
import litera_z from '../assets/semne/semn_z.JPG'

const LimbajulSemnelorPage = () => {

const semne = [
    {
        litera: "A",
        poza: litera_a
    },
    {
        litera: "B",
        poza: litera_b
    },
    {
        litera: "C",
        poza: litera_c
    },
     {
        litera: "D",
        poza:  litera_d
    },
    {
        litera: "E",
        poza: litera_e
    },
    {
        litera: "F",
        poza: litera_f
    },
    {
        litera: "G",
        poza: litera_g
    },
     {
        litera: "H",
        poza: litera_h
    },
    {
        litera: "I",
        poza: litera_i
    },
    {
        litera: "J",
        poza: litera_j
    },
    {
        litera: "K",
        poza: litera_k
    },
     {
        litera: "L",
        poza: litera_l
    },
    {
        litera: "M",
        poza: litera_m
    },
    {
        litera: "N",
        poza: litera_n
    },
    {
        litera: "O",
        poza: litera_o
    },
     {
        litera: "P",
        poza: litera_p
    },
    {
        litera: "Q",
        poza: litera_q
    },
    {
        litera: "R",
        poza: litera_r
    },
    {
        litera: "S",
        poza: litera_s
    },
     {
        litera: "T",
        poza: litera_t
    },
    {
        litera: "U",
        poza: litera_u
    },
    {
        litera: "V",
        poza: litera_v
    },
    {
        litera: "W",
        poza: litera_w
    },
    {
        litera: "X",
        poza: litera_x
    },
    {
        litera: "Y",
        poza: litera_y
    },
    {
        litera: "Z",
        poza: litera_z
    }
]

    return(
<div className="lb-semne">
{/* <Sidebar></Sidebar> */}

<div className="d-grid">
    <div className="row"><NavigationBar></NavigationBar></div>
  <div className="row"> 
  <div className="col-2 col"><Sidebar></Sidebar></div>
  <div className="col">
      <div className="row">
          { semne.length !== 0 && 
                        semne.map((word) => (  
                            <div className="col-3" >
                                <Card key={semne.indexOf(word)} semn={word} isClicked={false}/>
                            </div>
                        ))
                    } 
      </div>
  </div>

 </div>
 </div>
</div>

    );

}
export default LimbajulSemnelorPage