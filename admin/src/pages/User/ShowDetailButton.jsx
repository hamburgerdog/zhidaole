import { Avatar, Button, List, Modal, Tabs, Typography } from 'antd';
import React, { memo, useCallback, useState } from 'react';

import { getReleaseByIDList } from '@/service';

const { TabPane } = Tabs;

const ShowDetailButton = memo(({ buttonName, title, subIDList, pubIDList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subList, setSubList] = useState([]);
  const [pubList, setPubList] = useState([]);

  const showModal = useCallback(async () => {
    if (subList.length === 0) {
      setSubList(await getReleaseByIDList(subIDList));
    }
    if (pubList.length === 0) {
      setPubList(await getReleaseByIDList(pubIDList));
    }
    setIsModalVisible(true);
  }, [isModalVisible, subList, pubList]);

  return (
    <>
      <Button type="link" onClick={showModal}>
        {buttonName}
      </Button>
      <Modal
        title={title}
        closable={false}
        mask={false}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Tabs defaultActiveKey="sub">
          <TabPane tab="用户订阅消息源ID" key="sub">
            <List style={{ maxHeight: 360, overflowY: 'auto' }}>
              {subList.map(
                ({
                  ReleaseSourceName: name,
                  ReleaseSourceID: id,
                  ReleaseSourceCoverUrl: avatar,
                }) => {
                  return (
                    <List.Item key={id}>
                      <List.Item.Meta
                        avatar={<Avatar size="large" src={`http://localhost/${avatar}`} />}
                        title={<Typography.Text>{name}</Typography.Text>}
                        description={<Typography.Text type="secondary">{id}</Typography.Text>}
                      />
                    </List.Item>
                  );
                },
              )}
            </List>
          </TabPane>
          <TabPane tab="用户发布消息源ID" key="pub">
            <List style={{ maxHeight: 360, overflowY: 'auto' }}>
              {pubList.map(
                ({
                  ReleaseSourceName: name,
                  ReleaseSourceID: id,
                  ReleaseSourceCoverUrl: avatar,
                }) => {
                  return (
                    <List.Item key={id}>
                      <List.Item.Meta
                        avatar={<Avatar size="large" src={`http://localhost/${avatar}`} />}
                        title={<Typography.Text>{name}</Typography.Text>}
                        description={<Typography.Text type="secondary">{id}</Typography.Text>}
                      />
                    </List.Item>
                  );
                },
              )}
            </List>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
});

export default ShowDetailButton;
