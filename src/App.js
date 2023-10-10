import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"

function App() {

  // useEffect(() => {
  //   document.title = "หารค่าเหล้า"
  // })

  
  const [name, setName] = useState("")
  const [namelistcounter, setNamelistcounter] = useState(0)
  const [namelist, setNamelist] = useState([
    {
      id: namelistcounter,
      name: "แม็ก"
    }
  ])

  // setNamelistcounter(namelistcounter + 1)
  // setNamelist([
  //   ...namelist,
  //   {
  //     id: namelistcounter,
  //     name: "max2"
  //   }
  // ])

  const [menu, setMenu] = useState("")
  const [menuprice, setMenuprice] = useState(0)
  const [menulistcounter, setMenulistcounter] = useState(0)
  const [menulist, setMenulist] = useState([
    {
      id: menulistcounter,
      name: "น้ำแข็ง",
      price: 20,
      divide_member: [],
    }
  ])



  const [summary, setSummary] = useState([])
  const [harnalert, setHarnalert] = useState("")



  // function addNameList(e){
  //   console.log(name)

  //         setName("")

  //         setNamelist([
  //           ...namelist,
  //           {
  //             id: namelist.length + 1,
  //             name: name
  //           }
  //         ])
  // }

  function deleteNameItem(id) {

    console.log(`DELETE NAME : ${id}`)
    setNamelist(namelist.filter(item => {
      if (item.id != id) {
        return item
      }
    }))
  }

  function deleteMenuItem(id) {

    console.log(`DELETE MENU : ${id}`)
    setMenulist(menulist.filter(item => {
      if (item.id != id) {
        return item
      }
    }))
  }


  // const divide_member_update = (menu_id, name_id, check_status) => {

  //   console.log(menu_id)
  //   console.log(name_id)
  //   console.log(check_status)

  // }


  const divide_member_add = (menu_id, member) => {

    console.log(menu_id)
    console.log(member)

    // let ts = menulist.map(item => item.id)
    // console.log(ts)
    let munu_pos = menulist.map(item => item.id).indexOf(menu_id)
    console.log(munu_pos)

    menulist[munu_pos].divide_member.push(member)


  }

  const divide_member_delete = (menu_id, member) => {

    console.log(menu_id)
    console.log(member)

    let munu_pos = menulist.map(item => item.id).indexOf(menu_id)
    console.log(munu_pos)

    menulist[munu_pos].divide_member = menulist[munu_pos].divide_member.filter(item => {
      console.log(item.id)
      console.log(member.id)
      if (item.id != member.id) {
        return item
      }
    })

  }


  return (
    <div className="App">

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <div style={{
        marginTop: `50px`
      }}>

        <p>รายการชื่อ ผู้ร่วมอุดมการณ์</p>


        <input placeholder="ชื่อคนที่จะหาร"
          value={name}
          onChange={e => {
            // console.log(e.target.value)
            setName(e.target.value)
          }} />

        <button onClick={e => {

          console.log(name)
          setName("")
          if (name !== "") {



            setNamelist([
              ...namelist,
              {
                id: namelistcounter + 1,
                name: name
              }
            ])

            setNamelistcounter(namelistcounter + 1)


          }



        }}>Add</button>

        <button onClick={() => {
          console.log(namelist)
        }}>TS</button>

      </div>


      <div>
        {namelist.map((item) => {
          // console.log(item)
          return (
            <div key={item.id}>{item.name} <button onClick={() => {
              deleteNameItem(item.id)
            }}>Delete</button></div>
          )

        })}
      </div>



      <div style={{ marginTop: `30px` }}>

        <p>รายการของ ที่จะหาร</p>

        <input placeholder='ชื่อของที่จะหาร'
          value={menu}
          onChange={e => {

            setMenu(e.target.value)
          }}
        />
        <input placeholder='ราคา'
          value={menuprice}
          type="number"
          min="0"
          onChange={e => {
            // let value = e.target.value
            // value = Math.min(value, 0)
            // console.log(value)
            setMenuprice(e.target.value)
          }}
        />

        <button
          onClick={() => {

            console.log(menu)
            setMenu("")
            setMenuprice(0)
            if (menu !== "") {
              setMenulist([...menulist,
              {
                id: menulistcounter + 1,
                name: menu,
                price: menuprice,
                divide_member: [],
              }
              ])

              setMenulistcounter(menulistcounter + 1)

            }

          }}
        >Add</button>
        <button onClick={() => {
          console.log(menulist)
        }}>TS</button>



        <div style={{ marginTop: `15px` }}>
          {menulist.map(item => {
            return (
              <div key={item.id}>{item.name} ราคา {item.price}&nbsp;
                <button onClick={() => {
                  deleteMenuItem(item.id)
                }}>Delete</button>

                {
                  namelist.map(item_name => {
                    console.log(item_name)
                    return (
                      <label
                        key={`lb-${item.id}-${item_name.id}`}
                      >
                        <input
                          key={`${item.id}-${item_name.id}`}
                          type="checkbox"
                          onChange={e => {


                            console.log(e.target.checked)

                            let is_check = e.target.checked
                            if (is_check) {
                              divide_member_add(item.id, item_name)
                            }
                            else {
                              divide_member_delete(item.id, item_name)
                            }


                          }}
                        />
                        {item_name.name}
                      </label>
                    )
                  })
                }


                {/* <label>
                  <input type="checkbox"/>
                  Checkkk
                </label>
                <label>
                  <input type="checkbox"/>
                  Checkkk
                </label> */}


              </div>
            )
          })}
        </div>
      </div>




      <div style={{ marginTop: `30px` }}>
        <button onClick={() => {

          console.log("HARNNN")
          setSummary([])
          setHarnalert(``)

          let temp_summary = []

          namelist.map(item => {
            let temp_member = {
              id: item.id,
              name: item.name,
              expense: 0,
            }

            temp_summary.push(temp_member)
          })

          console.log(temp_summary)


          let is_fail = false
          for (let i = 0; i < menulist.length; i++) {

            let item_menu = menulist[i]
            let number_divide = item_menu.divide_member.length
            if (number_divide == 0) {
              is_fail = true
              break
            }

            console.log(`number_divide : ${number_divide}`)
            let temp_expense = item_menu.price / number_divide

            console.log(`item_menu name : ${item_menu.name}`)
            console.log(`temp_expense : ${temp_expense}`)

            temp_summary.map(mem_sum => {


              let idOfMember = item_menu.divide_member.map(mem => mem.id).indexOf(mem_sum.id)

              if (idOfMember != -1) {
                mem_sum.expense += temp_expense
              }

              return mem_sum

            })




            console.log(temp_summary)





          }



          // show summary
          if (!is_fail) {
            setSummary(temp_summary)
          }
          else {

            console.log("มีบางเมนูไม่มีคนหาร")
            setHarnalert(`มีบางเมนูไม่มีคนหาร`)

          }


          // menulist.map(item => {
          //   let number_divide = item.divide_member.length
          //   console.log(`number_divide : ${number_divide}`)
          //   let temp_expense = item.price / number_divide
          // })


        }}>HARN</button>


        <p style={{ color: `red` }}>{harnalert}</p>
      </div>


      <div style={{ marginTop: `30px` }}>

        {summary.map(item => {
          return (
            <div key={`sum-${item.id}`}>{item.name} จ่าย {item.expense}</div>
          )
        })}

      </div>



    </div>
  );
}

export default App;
