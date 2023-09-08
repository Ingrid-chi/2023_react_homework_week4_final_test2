import clsx from 'clsx';
import classes from './tabs.module.scss';

const tabs = [
  {
    id: 1,
    name: '全部',
    status: 'all',
  },
  {
    id: 2,
    name: '待完成',
    status: 'in-progress',
  },
  {
    id: 3,
    name: '已完成',
    status: 'finished',
  },
];

const Tabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className={classes.wrapper}>
      {tabs.map((tab) => (
        <p
          key={tab.id}
          className={clsx(classes.text, {
            [classes.active]: selectedTab === tab.status,
          })}
          onClick={() => setSelectedTab(tab.status)}
        >
          {tab.name}
        </p>
      ))}
    </div>
  );
};

export default Tabs;
