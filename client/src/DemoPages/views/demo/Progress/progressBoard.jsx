/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Input, Button, Avatar, Menu, Divider, Dropdown, Table } from "antd";
import {
  Pencil,
  ChatText,
  PinAngle,
  ThreeDots,
  InputCursorText,
  Link45deg,
  Trash,
  PlusLg,
} from "react-bootstrap-icons";
import { Col, Row, Container } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ArchiveIcon, PlusIcon } from "@heroicons/react/solid";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
import KanbanList from "./components/KanbanList";
import KanbanCard from "./components/KanbanCard";

import Profile1 from "../../../../assets/img/team/profile-picture-1.jpg";
import Profile2 from "../../../../assets/img/team/profile-picture-2.jpg";
import Profile3 from "../../../../assets/img/team/profile-picture-3.jpg";
import Profile4 from "../../../../assets/img/team/profile-picture-4.jpg";

import Link1 from "../../../../assets/img/link/slack.png";
import Link2 from "../../../../assets/img/link/jira.jpg";
import Link3 from "../../../../assets/img/link/confluence.jpg";
import { Link } from "react-router-dom";

import {
  KanbanEditModal,
  KanbanEditAssigneesModal,
  KanbanEditMembersModal,
  KanbanEditLabelsModal,
} from "./components/Modals";

export const Links = {
  slack: { id: uuidv4(), name: "Slack", image: Link1 },
  jira: { id: uuidv4(), name: "Jira", image: Link2 },
  confluence: { id: uuidv4(), name: "Confluence", image: Link3 },
};

export const Members = [
  { id: uuidv4(), name: "Ryan Tompson", image: Profile1 },
  { id: uuidv4(), name: "Alexander Smith", image: Profile2 },
  { id: uuidv4(), name: "Bonnie Green", image: Profile3 },
  { id: uuidv4(), name: "Scott Anderson", image: Profile4 },
];

export const Labels = [
  { id: uuidv4(), name: "Help wanted", color: "primary" },
  { id: uuidv4(), name: "Feature", color: "tertiary" },
  { id: uuidv4(), name: "Feature request", color: "secondary" },
  { id: uuidv4(), name: "Urgent", color: "danger" },
  { id: uuidv4(), name: "High priority", color: "warning" },
  { id: uuidv4(), name: "Low priority", color: "yellow-200" },
  { id: uuidv4(), name: "Needs investigation", color: "indigo" },
  { id: uuidv4(), name: "Discussion", color: "purple" },
];

export const Priority = [
  { id: uuidv4(), name: "Highest", color: "#e11d48" },
  { id: uuidv4(), name: "High", color: "#fba918" },
  { id: uuidv4(), name: "Medium", color: "#4ce74a" },
  { id: uuidv4(), name: "Low", color: "#46b5e9" },
  { id: uuidv4(), name: "Lowest", color: "#7c3aed" },
];

const createList = (props = {}) => ({
  title: "",
  cards: [],
  ...props,
  id: uuidv4(),
  dateCreated: moment().format("DD MMM YYYY"),
});

const createCard = (props = {}) => ({
  title: "",
  description: "",
  author: Members[0],
  members: [Members[0]],
  labels: [Labels[0]],
  comments: [],
  ...props,
  id: uuidv4(),
  dateCreated: moment().format("DD MMM YYYY"),
});

const KANBAN_LISTS = [
  {
    id: uuidv4(),
    title: "Backlog",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [
      {
        id: uuidv4(),
        title: "Team works well together",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1], Members[2]],
        assignees: [Members[0]],
        priority: Priority[0],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "https://slack.com/",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "https://www.confluence.com/",
          },
        ],
        labels: [Labels[0]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment().format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment().format("MMMM D, YYYY [at] h:mm A"),
      },
      {
        id: uuidv4(),
        title: "DevOps Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1]],
        assignees: [Members[0]],
        priority: Priority[1],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "https://www.confluence.com/",
          },
        ],
        labels: [Labels[1]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment()
          .subtract(2, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment()
          .subtract(2, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
      },
      {
        id: uuidv4(),
        title: "Blue Tech Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1]],
        assignees: [Members[0]],
        priority: Priority[2],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "https://slack.com/",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "",
          },
        ],
        labels: [Labels[2]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment()
          .subtract(3, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment()
          .subtract(3, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Crawl",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [
      {
        id: uuidv4(),
        title: "DevOps Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1]],
        assignees: [Members[0]],
        priority: Priority[1],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "https://www.confluence.com/",
          },
        ],
        labels: [Labels[1]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment()
          .subtract(2, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment()
          .subtract(2, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
      },
      {
        id: uuidv4(),
        title: "Blue Tech Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1]],
        assignees: [Members[0]],
        priority: Priority[2],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "https://slack.com/",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "",
          },
        ],
        labels: [Labels[2]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment()
          .subtract(3, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment()
          .subtract(3, "days")
          .format("MMMM D, YYYY [at] h:mm A"),
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Walk",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [
      {
        id: uuidv4(),
        title: "Executive Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[0],
        members: [Members[0], Members[1], Members[2]],
        assignees: [Members[0]],
        priority: Priority[1],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "https://slack.com/",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "https://www.confluence.com/",
          },
        ],
        labels: [Labels[0]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment().format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment().format("MMMM D, YYYY [at] h:mm A"),
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Run",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [
      {
        id: uuidv4(),
        title: "Marketing Team",
        description:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        author: Members[1],
        members: [Members[0], Members[1], Members[2]],
        assignees: [Members[0]],
        priority: Priority[4],
        effort: 5,
        businessValue: 6,
        valueArea: "Accounting",
        category: "None",
        like: 6,
        CP: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.\n\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected hum our, or randomized words which don't look even slightly believable.",
        links: [
          {
            id: Links["slack"].id,
            name: Links["slack"].name,
            image: Links["slack"].image,
            link: "https://slack.com/",
          },
          {
            id: Links["jira"].id,
            name: Links["jira"].name,
            image: Links["jira"].image,
            link: "https://www.atlassian.com/software/jira",
          },
          {
            id: Links["confluence"].id,
            name: Links["confluence"].name,
            image: Links["confluence"].image,
            link: "https://www.confluence.com/",
          },
        ],
        labels: [Labels[1]],
        comments: [
          {
            id: uuidv4(),
            sender: "Ryan Tompson",
            timeSent: moment().subtract(1, "hour"),
            message: "This is a test comment.",
          },
        ],
        dateCreated: moment().format("MMMM D, YYYY [at] h:mm A"),
        dateUpdated: moment().format("MMMM D, YYYY [at] h:mm A"),
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Jump",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [],
  },
  {
    id: uuidv4(),
    title: "Leap",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [],
  },
  {
    id: uuidv4(),
    title: "Done",
    dateCreated: moment().format("DD MMM YYYY"),
    cards: [],
  },
];

const ArchiveIconHtml = ReactDOMServer.renderToString(
  <ArchiveIcon className="h-50 w-auto" />
);

const SwalWithBootstrapButtons = withReactContent(
  Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary me-3",
      cancelButton: "btn btn-gray",
    },
    buttonsStyling: false,
  })
);

export default (props) => {
  const boardTitle = props.boardInfo.progressBoard.title;

  const [kanbanLists, setKanbanLists] = useState(KANBAN_LISTS);
  const createCardDefaultProps = { listId: kanbanLists[0].id, cardIndex: 0 };
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [createCardProps, setCreateCardProps] = useState(
    createCardDefaultProps
  );
  const [cardToEdit, setCardToEdit] = useState(null);
  const [cardToCopy, setCardToCopy] = useState(null);
  const [cardToMove, setCardToMove] = useState(null);
  const [cardToChangeAssignees, setCardToChangeAssignees] = useState(null);
  const [cardToChangeMembers, setCardToChangeMembers] = useState(null);
  const [cardToChangeLabels, setCardToChangeLabels] = useState(null);
  const [listToCopy, setListToCopy] = useState(null);
  const [listToMoveIndex, setListToMoveIndex] = useState(null);

  const toggleCreateListModal = () => {
    setShowCreateListModal(!showCreateListModal);
  };

  const toggleCreateCardModal = (props = {}) => {
    setCreateCardProps({ ...createCardDefaultProps, ...props });
    setShowCreateCardModal(!showCreateCardModal);
  };

  const getCardStyle = (style, snapshot) => {
    const isJustDragging = snapshot.isDragging && !snapshot.isDropAnimating;

    if (!isJustDragging) {
      return style;
    }

    return {
      ...style,
      transform: `${style.transform || ""} rotate(6deg)`,
    };
  };

  const handleCreateCard = (props = {}) => {
    const listsUpdated = createCardInListAtIndex({
      ...createCardProps,
      ...props,
    });

    toggleCreateCardModal();
    setKanbanLists(listsUpdated);
  };

  const handleCopyCard = (card = {}) => {
    const { listId, title, description } = card;
    const listsUpdated = createCardInListAtIndex({
      listId,
      title,
      description,
    });

    setCardToCopy(null);
    setKanbanLists(listsUpdated);
  };

  const handleMoveList = ({ source, destination }) => {
    const lists = [...kanbanLists];
    const [listRemoved] = lists.splice(source.index, 1);
    lists.splice(destination.index, 0, listRemoved);

    setKanbanLists(lists);
    setListToMoveIndex(null);
  };

  const handleCreateList = (props) => {
    const newList = createList(props);
    const listsUpdated = [...kanbanLists, newList];

    setShowCreateListModal(false);
    setKanbanLists(listsUpdated);
    setListToCopy(null);
  };

  const reorderCards = (cards = [], startIndex, endIndex) => {
    const [cardRemoved] = cards.splice(startIndex, 1);
    cards.splice(endIndex, 0, cardRemoved);

    return cards;
  };

  const moveCardFromList = (sList, dList, sIndex, dIndex) => {
    const sCards = [...sList.cards];
    const dCards = [...dList.cards];

    const [cardRemoved] = sCards.splice(sIndex, 1);
    dCards.splice(dIndex, 0, cardRemoved);

    return [
      { ...sList, cards: sCards },
      { ...dList, cards: dCards },
    ];
  };

  const handleDragEnd = (dragResult) => {
    const { source, destination } = dragResult;

    //  dropped outside the list
    if (!destination) {
      return;
    }

    const { droppableId: sListId, index: sCardIndex } = source;
    const { droppableId: dListId, index: dCardIndex } = destination;

    const sList = kanbanLists.find((l) => l.id === sListId);
    const dList = kanbanLists.find((l) => l.id === dListId);

    if (sListId === dListId) {
      // reorder cards in the list only if card's index changes
      if (sCardIndex !== dCardIndex) {
        const sCardsUpdated = reorderCards(sList.cards, sCardIndex, dCardIndex);
        const listsUpdated = kanbanLists.map((l) =>
          l.id === sListId ? { ...l, cards: sCardsUpdated } : l
        );
        setKanbanLists(listsUpdated);
      }
    } else {
      const [sListUpdated, dListUpdated] = moveCardFromList(
        sList,
        dList,
        sCardIndex,
        dCardIndex
      );
      const listsUpdated = kanbanLists.map((l) =>
        l.id === sListId ? sListUpdated : l.id === dListId ? dListUpdated : l
      );
      setKanbanLists(listsUpdated);
    }

    if (cardToMove) {
      setCardToMove(null);
    }
  };

  const removeCardsFromList = (cards) => {
    const cardsGroupedByListId = cards.reduce((acc, card) => {
      const { listId, cardId } = card;

      if (!acc[listId]) acc[listId] = [cardId];
      else acc[listId].push(cardId);

      return acc;
    }, {});

    const listsUpdated = kanbanLists.map((l) => {
      const cardsToDelete = cardsGroupedByListId[l.id];
      if (!cardsToDelete) return l;

      const cardsUpdated = l.cards.filter((c) => !cardsToDelete.includes(c.id));
      return { ...l, cards: cardsUpdated };
    });

    return listsUpdated;
  };

  const handleListDelete = async (listId) => {
    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: "Are you sure do you want to delete this list?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const listsUpdated = kanbanLists.filter((l) => l.id !== listId);
      setKanbanLists(listsUpdated);

      await SwalWithBootstrapButtons.fire(
        "Deleted",
        "The list has been deleted.",
        "success"
      );
    }
  };

  const handleCardsDelete = async (cards = []) => {
    const cardsNr = cards.length;
    const textMessage =
      cardsNr === 1
        ? "Are you sure do you want to delete this card?"
        : `Are you sure do you want to delete these ${cardsNr} cards?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "error",
      title: "Confirm deletion",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const listsUpdated = removeCardsFromList(cards);
      setKanbanLists(listsUpdated);

      const confirmMessage =
        cardsNr === 1
          ? "The card has been deleted."
          : "The cards have been deleted.";
      await SwalWithBootstrapButtons.fire("Deleted", confirmMessage, "success");
    }
  };

  const handleArchiveCards = async (cards = []) => {
    const cardsNr = cards.length;
    const textMessage =
      cardsNr === 1
        ? "Are you sure do you want to archive this card?"
        : `Are you sure do you want to archive these ${cardsNr} cards?`;

    const result = await SwalWithBootstrapButtons.fire({
      icon: "question",
      iconHtml: ArchiveIconHtml,
      title: "Confirm archivation",
      text: textMessage,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setCardToEdit(null);
      const listsUpdated = removeCardsFromList(cards);
      setKanbanLists(listsUpdated);

      const confirmMessage =
        cardsNr === 1
          ? "The card has been archived."
          : "The cards have been archived.";
      await SwalWithBootstrapButtons.fire(
        "Archived",
        confirmMessage,
        "success"
      );
    }
  };

  const handleListTitleChange = ({ id, title }) => {
    const listsUpdated = kanbanLists.map((l) =>
      l.id === id ? { ...l, title } : l
    );
    setKanbanLists(listsUpdated);
  };

  const handleCardChange = (props) => {
    const { listId, cardId, ...otherProps } = props;
    let isListIdChanged = false;
    let tempCard;

    let listsUpdated = kanbanLists.map((l) => {
      if (l.id !== listId) {
        const cards = [];
        const cs = l.cards;
        for (let i = 0; i < cs.length; i++) {
          if (cs[i].id === cardId) {
            isListIdChanged = true;
            tempCard = cs[i];
          } else {
            cards.push(cs[i]);
          }
        }

        if (isListIdChanged) return { ...l, cards };
        return l;
      }

      const cards = l.cards.map((c) =>
        c.id === cardId ? { ...c, ...otherProps } : c
      );

      if (isListIdChanged === true) {
        cards.unshift(tempCard);
        isListIdChanged = false;
      }
      return { ...l, cards };
    });

    if (isListIdChanged) {
      listsUpdated = listsUpdated.map((l) => {
        if (l.id === listId) {
          l.cards.unshift(tempCard);
        }
        return l;
      });
    }

    if (cardToEdit) {
      setCardToEdit({ ...cardToEdit, ...otherProps });
    }

    setKanbanLists(listsUpdated);
    setCardToChangeAssignees(null);
    setCardToChangeMembers(null);
  };

  const createCardInListAtIndex = (props) => {
    const { listId, cardIndex, ...otherProps } = props;

    const listsUpdated = kanbanLists.map((l) => {
      if (listId !== l.id) return l;

      const newCard = createCard(otherProps);
      l.cards.splice(cardIndex, 0, newCard);

      return l;
    });

    return listsUpdated;
  };

  return (
    <>
      {cardToEdit && (
        <KanbanEditModal
          show={true}
          boardTitle={boardTitle}
          priorities={Priority}
          kanbanLists={kanbanLists}
          {...cardToEdit}
          onHide={() => setCardToEdit(null)}
          onEditAssignees={(card) => setCardToChangeAssignees(card)}
          onEditMembers={(card) => setCardToChangeMembers(card)}
          onEditLabels={(card) => setCardToChangeLabels(card)}
          onChange={handleCardChange}
        />
      )}

      {cardToChangeAssignees && (
        <KanbanEditAssigneesModal
          show={true}
          {...cardToChangeAssignees}
          onHide={() => setCardToChangeAssignees(null)}
          onSubmit={handleCardChange}
        />
      )}

      {cardToChangeMembers && (
        <KanbanEditMembersModal
          show={true}
          {...cardToChangeMembers}
          onHide={() => setCardToChangeMembers(null)}
          onSubmit={handleCardChange}
        />
      )}

      {cardToChangeLabels && (
        <KanbanEditLabelsModal
          show={true}
          {...cardToChangeLabels}
          onHide={() => setCardToChangeLabels(null)}
          onSubmit={handleCardChange}
        />
      )}

      <div>
        <div className="top-content">
          <text style={{ color: "#757575f0" }}>
            Matthew Mills / Progress Board
          </text>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button className="primary-button">Share</Button>
            <Button
              className="primary-button"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PlusLg />
              Add new card
            </Button>
            <Button
              className="primary-button"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PlusLg />
              Add Column
            </Button>
            <Button
              type="ghost"
              style={{
                padding: "0",
                height: "24px",
                fontSize: "20px",
                fontWeight: "800",
                display: "flex",
                alignItems: "end",
              }}
            >
              <Dropdown
                overlay={
                  <Menu style={{ width: "144px" }}>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Pencil />
                        <span>Edit</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <InputCursorText />
                        <span>Rename</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Link45deg />
                        <span>Get link</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <PinAngle />
                        <span>Pin</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginLeft: "18px",
                        }}
                      >
                        <span>Copy</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginLeft: "18px",
                        }}
                      >
                        <span>Archive</span>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginLeft: "18px",
                        }}
                      >
                        <span>Move</span>
                      </div>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Trash />
                        <span>Delete</span>
                      </div>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                trigger={["click"]}
              >
                <ThreeDots onClick={(e) => e.preventDefault()} />
              </Dropdown>
            </Button>
          </div>
        </div>
        <div className="middle-content">
          <div className="frame1">
            <text style={{ fontSize: "21px", fontWeight: "600" }}>
              {boardTitle}
            </text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: "153px",
              }}
            >
              <Avatar
                style={{
                  width: "28px",
                  minWidth: "28px",
                  height: "28px",
                  minHeight: "28px",
                  backgroundColor: "#6123ffed",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                MM
              </Avatar>
              <div
                style={{
                  marginLeft: "8px",
                  display: "flex",
                  flexDirection: "column",
                  color: "rgba(117, 117, 117, 0.94)",
                }}
              >
                <text style={{ fontSize: "10px" }}>
                  Created by Matthew Mills
                </text>
                <text style={{ fontSize: "10px" }}>
                  May 03, 2023 – 1 min read
                </text>
              </div>
            </div>
          </div>
          <Container fluid className="kanban-container py-4 px-0">
            <Row className="d-flex flex-nowrap">
              <DragDropContext onDragEnd={handleDragEnd}>
                {kanbanLists.map((list, ind) => {
                  const { id: listId, title, cards } = list;

                  return (
                    <Droppable
                      index={ind}
                      droppableId={`${listId}`}
                      key={`kanban-list-${listId}`}
                    >
                      {(provided) => {
                        const {
                          innerRef: listRef,
                          placeholder,
                          droppableProps,
                        } = provided;

                        return (
                          <KanbanList
                            {...list}
                            listRef={listRef}
                            extraProps={droppableProps}
                            onCardAdd={() => toggleCreateCardModal({ listId })}
                            onListCopy={() => setListToCopy(list)}
                            onListMove={() => setListToMoveIndex(ind)}
                            onListDelete={handleListDelete}
                            onTitleChange={handleListTitleChange}
                          >
                            {cards.map((card, index) => {
                              const { id: cardId } = card;

                              return (
                                <Draggable
                                  index={index}
                                  draggableId={`${cardId}`}
                                  key={`kanban-card-${cardId}`}
                                >
                                  {(provided, snapshot) => {
                                    const {
                                      innerRef: cardRef,
                                      draggableProps,
                                      dragHandleProps,
                                    } = provided;

                                    return (
                                      <KanbanCard
                                        {...card}
                                        cardRef={cardRef}
                                        style={getCardStyle(
                                          draggableProps.style,
                                          snapshot
                                        )}
                                        extraProps={{
                                          ...draggableProps,
                                          ...dragHandleProps,
                                        }}
                                        onDelete={() =>
                                          handleCardsDelete([
                                            { listId, cardId },
                                          ])
                                        }
                                        onClick={() =>
                                          setCardToEdit({
                                            listId,
                                            index,
                                            ...card,
                                          })
                                        }
                                        onEdit={() =>
                                          setCardToEdit({
                                            listId,
                                            index,
                                            ...card,
                                          })
                                        }
                                        onCopy={() =>
                                          setCardToCopy({ listId, ...card })
                                        }
                                        onMove={() =>
                                          setCardToMove({ listId, index })
                                        }
                                        onChangeMembers={() =>
                                          setCardToChangeMembers({
                                            listId,
                                            ...card,
                                          })
                                        }
                                        onChangeLabels={() =>
                                          setCardToChangeLabels({
                                            listId,
                                            ...card,
                                          })
                                        }
                                      />
                                    );
                                  }}
                                </Draggable>
                              );
                            })}

                            {placeholder}
                            <Button
                              variant="outline-gray-500"
                              onClick={() =>
                                toggleCreateCardModal({
                                  listId,
                                  cardIndex: cards.length,
                                })
                              }
                              className="d-inline-flex align-items-center justify-content-center btn btn-outline-gray-500 w-100"
                            >
                              <PlusIcon className="icon icon-xs me-2" /> Add
                              another card
                            </Button>
                          </KanbanList>
                        );
                      }}
                    </Droppable>
                  );
                })}
              </DragDropContext>
            </Row>
          </Container>
        </div>
        <div className="bottom-content">
          <Divider style={{ marginBottom: "8px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ChatText size={24} style={{ color: "rgb(123 123 123 / 94%)" }} />
            <text>1 page comment</text>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{
                width: "28px",
                minWidth: "28px",
                height: "28px",
                minHeight: "28px",
                backgroundColor: "#6123ffed",
                display: "flex",
                alignItems: "center",
              }}
            >
              MM
            </Avatar>
            <div
              style={{
                marginLeft: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <text>Matthew Mills</text>
              <text style={{ fontSize: "10px" }}>Less than a minute ago</text>
            </div>
          </div>
          <text style={{ marginLeft: "36px" }}>This is a test comment</text>
          <div style={{ marginLeft: "21px", display: "flex", gap: "4px" }}>
            <Button type="ghost">Reply</Button>
            <Button type="ghost">Edit</Button>
            <Button type="ghost">Delete</Button>
          </div>
          <Divider style={{ marginBottom: "8px" }} />
          <div style={{ display: "flex" }}>
            <Avatar
              style={{
                width: "28px",
                minWidth: "28px",
                height: "28px",
                minHeight: "28px",
                backgroundColor: "#6123ffed",
                display: "flex",
                alignItems: "center",
              }}
            >
              MM
            </Avatar>
            <Input.TextArea
              style={{
                marginLeft: "8px",
                marginTop: "-2px",
                width: "-webkit-fill-available",
                backgroundColor: "rgb(209 209 209 / 48%)",
                padding: "4px 16px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
              placeholder="Write a comment…"
              rows={1}
            />
          </div>
        </div>
      </div>
    </>
  );
};
