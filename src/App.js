import React, { useState, useEffect } from 'react';
import data from './data';
import './style.css';

function App() {
  const [selectedAttr, setSelectedAttr] = useState('暗'); // 選擇的屬性
  const [selectedImageId, setSelectedImageId] = useState(null); // 選擇的圖片ID
  const [selectedImageBranch, setSelectedImageBranch] = useState(null); // 選擇的圖片Branch
  const [selectedOption, setSelectedOption] = useState('Cross-Shaped_2');
  const [filteredImages, setFilteredImages] = useState([]); // 過濾後的圖片列表

  // 使用效果鉤子來過濾圖片列表
  useEffect(() => {
    // 根據選擇的屬性過濾圖片資料
    const filteredData = data.filter((item) => item.attr === selectedAttr);

    // 如果當前的選擇屬性分頁下有圖片，則選擇該分頁下的第一張圖片
    if (filteredData.length > 0) {
      setSelectedImageId(filteredData[0].id);
    } else {
      setSelectedImageId(null); // 否則清除選擇的圖片ID
    }

    const imageElements = filteredData.map((item) => (
      <div key={item.id} className="image-wrapper">
        <img
          src={getThumbnailUrl(item.id)}
          alt={`圖片 ${item.id}`}
          width="50"
          className={selectedImageId === item.id ? 'selected' : ''}
          onClick={() => handleImageClick(item.id)}
        />
      </div>
    ));
    setFilteredImages(imageElements);
  }, [selectedAttr, selectedImageId, selectedOption]);

  // 處理屬性選擇的函數
  const handleAttrChange = (attr) => {
    setSelectedAttr(attr);
  };

  // 處理圖片點擊的函數
  const handleImageClick = (id, branch) => {
    setSelectedImageId(id);
    setSelectedImageBranch(branch);
  };

  // 處理選項改變的函數
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // 獲取縮圖的URL
  const getThumbnailUrl = (id) => {
    return `https://hiteku.github.io/img/tos/cards/icon/${id}i.png`;
  };

  // 獲取轉法圖的URL
  const getImageUrl = (id, branch) => {
    var add = ''
    if (branch === 2)
      add = '/1st'
    else if (branch === 3)
      add = '/T'
    return `https://hiteku.github.io/img/tos/number/${id}` + add + `/${selectedOption}.jpg`;
  };

  // 使用效果鉤子來過濾圖片列表
  useEffect(() => {
    // 根據選擇的屬性過濾圖片資料
    const filteredData = data.filter((item) => item.attr === selectedAttr);

    // 如果當前的選擇屬性分頁下有圖片，則選擇該分頁下的第一張圖片
    if (filteredData.length > 0) {
      // 檢查選擇的圖片是否存在於過濾後的列表中，如果不存在，選擇第一張圖片
      const newSelectedImageId = filteredData.some((item) => item.id === selectedImageId)
        ? selectedImageId
        : filteredData[0].id;

      setSelectedImageId(newSelectedImageId);
    } else {
      setSelectedImageId(null);
    }

    const imageElements = filteredData.map((item) => (
      <div key={item.id} className="image-wrapper">
        <img
          src={getThumbnailUrl(item.id)}
          alt={`${item.id}`}
          width="50"
          className={selectedImageId === item.id ? 'selected' : ''}
          onClick={() => handleImageClick(item.id, item.branch)}
        />
      </div>
    ));
    setFilteredImages(imageElements);
  }, [selectedAttr, selectedImageId, selectedOption]);

  const attributeLabels = Array.from(new Set(data.map((item) => item.attr)));

  return (
    <div className="App">
      <header>
        <h1>固版轉法</h1>
      </header>
      <div className="container">
        <div className="sidebar">
          <ul>
            {attributeLabels.map((attr) => (
              <li
                key={attr}
                className={selectedAttr === attr ? 'active' : ''}
                onClick={() => handleAttrChange(attr)}
              >
                {attr}
              </li>
            ))}
          </ul>
          <div className="thumbnail-images">
            {selectedAttr && (
              <div className="thumbnail-images">
                {filteredImages.length > 0 ? (
                  filteredImages
                ) : (
                  <p>無相關圖片 {selectedAttr}</p>
                )}
              </div>
            )}
          </div>
          <div className="option-select">
            <label htmlFor="options">轉法 </label>
            <select
              id="options"
              value={selectedOption}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="styled-select"
            >
              {[...Array(13).keys()].map((i) => (
                <option key={i} value={i + 15}>
                  {i + 15}
                </option>
              ))}
              <option value="Cross-Shaped_1">單十字</option>
              <option value="Cross-Shaped_2">雙十字</option>
              <option value="Cross-Shaped_3">三十字</option>
            </select>
          </div>
        </div>
        <div className="content">
          {selectedImageId && (
            <div className="selected-image">
              <img
                src={getImageUrl(selectedImageId, selectedImageBranch)}
                alt={`目前尚未有${selectedImageId}轉法`}
                style={{ width: '200px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
