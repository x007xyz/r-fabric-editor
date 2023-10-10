import React, { useEffect } from 'react'
import { FileTextOutlined, PictureOutlined, SmileOutlined, FileOutlined } from '@ant-design/icons';

const Menu = (props) => {
  const [active, setActive] = React.useState(0)

  useEffect(() => {
    props.onChangeMenu(active)
  }, [active])

  return (
    <div className='menu-list'>
      <div className={'menu-item' + (active === 0 ? ' active' : '')} onClick={() => setActive(0)}>
        <div className='menu-item-icon'>
          <FileTextOutlined />
        </div>
        <div className='menu-item-text'>模板</div>
      </div>
      <div className={'menu-item' + (active === 1 ? ' active' : '')} onClick={() => setActive(1)}>
        <div className='menu-item-icon'>
          <PictureOutlined />
        </div>
        <div className='menu-item-text'>元素</div>
      </div>
      <div className={'menu-item' + (active === 2 ? ' active' : '')} onClick={() => setActive(2)}>
        <div className='menu-item-icon'>
          <SmileOutlined/>
        </div>
        <div className='menu-item-text'>卡通</div>
      </div>
      <div className={'menu-item' + (active === 3 ? ' active' : '')} onClick={() => setActive(3)}>
        <div className='menu-item-icon'>
          <FileOutlined />
        </div>
        <div className='menu-item-text'>图层</div>
      </div>
    </div>
  )
}

export default Menu
