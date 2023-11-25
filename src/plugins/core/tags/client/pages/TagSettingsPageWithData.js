/* eslint-disable function-paren-newline */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { registerComponent, Components } from "@reactioncommerce/reaction-components";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { withApollo } from "react-apollo";
import { uniqueId } from "lodash";
import styled from "styled-components";
import Button from "@reactioncommerce/catalyst/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { registerComponent, Components } from "../../../../core/lib";
// import { i18next } from "/client/api";
// import withOpaqueShopId from "/imports/plugins/core/graphql/lib/hocs/withOpaqueShopId";
import { tagListingQuery } from "../../lib/queries";
import withOpaqueShopId from "../../../graphql/lib/hocs/withOpaqueShopId";
import { updateTagMutation, removeTagMutation } from "../../lib/mutations";
import TagDataTableColumn from "../components/TagDataTableColumn";
import TagDataTable from "../components/TagDataTable";

const ButtonBar = styled.div`
  margin-bottom: 20px;
`;

class TagSettings extends Component {
  static propTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    isLoadingPrimaryShopId: PropTypes.bool,
    isLoadingShopId: PropTypes.bool,
    shopId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.bulkActions = [
      { value: "hidden", label: "makeHidden" },
      { value: "visible", label: "makeVisible" },
      { value: "delete", label: "delete" }
    ];

    this.tableRef = React.createRef();
  }

  state = {
    selection: [],
    selectedTag: null
  };

  formValue = null;

  uniqueInstanceIdentifier = uniqueId("URLRedirectEditForm");

  handleCellClick = ({ column, rowData }) => {
    if (column.id === "edit") {
      this.setState({
        selection: []
      });

      this.props.history.push(`/${this.props.shopId}/tags/edit/${rowData._id}`);
    }
  };

  handleShowCreateForm = () => {
    this.props.history.push(`/${this.props.shopId}/tags/create`);
  };

  handleBulkAction = async (action, itemIds) => {
    const { client, shopId } = this.props;
    let mutation = updateTagMutation;

    // Escape early if you don't have a valid action
    if (!["visible", "hidden", "delete"].includes(action)) {
      return Promise.reject(`Invalid bulk action: ${action}`);
    }

    // Use the remove mutation for the delete action
    if (action === "delete") {
      mutation = removeTagMutation;
    }

    const promises = itemIds.map((item) => {
      let input = {
        id: item._id,
        shopId
      };

      // For visible / hidden we need to supply the required fields for
      // the `UpdateTagInput`
      if (action === "visible" || action === "hidden") {
        input = {
          ...input,
          isVisible: action === "visible",
          name: item.name,
          displayTitle: item.displayTitle
        };
      }

      return client.mutate({
        mutation,
        variables: {
          input
        }
      });
    });

    await Promise.all(promises);

    if (action === "delete") {
      this.tableRef.current.refetch();
    }

    return null;
  };

  reset() {
    this.setState({
      selection: []
    });
  }


  renderTable() {
    const { shopId, isLoadingPrimaryShopId } = this.props;

    if (isLoadingPrimaryShopId) return null;

    const filteredFields = ["heroMediaUrl", "slug", "displayTitle", "name", "isVisible", "edit"];
    const noDataMessage = "admin.tags.tableText.noDataMessage";

    // helper adds a class to every grid row
    const customRowMetaData = {
      bodyCssClassName: () => "email-grid-row"
    };

    // add i18n handling to headers
    const customColumnMetadata = [];
    filteredFields.forEach((field) => {
      let colWidth;
      let colStyle;
      let colClassName;
      let headerLabel = `${field}`;

      if (field === "heroMediaUrl") {
        colWidth = 70;
        colClassName = "email-log-status";
        headerLabel = "";
      }

      if (field === "edit") {
        colWidth = 44;
        colStyle = { textAlign: "center", cursor: "pointer" };
        headerLabel = "";
      }

      if (field === "isVisible") {
        colWidth = 110;
        headerLabel = "status";
      }

      // https://react-table.js.org/#/story/cell-renderers-custom-components
      const columnMeta = {
        accessor: field,
        Header: headerLabel,
        Cell: (row) => (
          <TagDataTableColumn row={row} />
        ),
        className: colClassName,
        width: colWidth,
        style: colStyle,
        headerStyle: { textAlign: "left" }
      };
      customColumnMetadata.push(columnMeta);
    });

    return (
      <TagDataTable
        ref={this.tableRef}
        bulkActions={this.bulkActions}
        query={tagListingQuery}
        variables={{ shopId }}
        dataKey="tags"
        onBulkAction={this.handleBulkAction}
        onCellClick={this.handleCellClick}
        showFilter={true}
        rowMetadata={customRowMetaData}
        filteredFields={filteredFields}
        noDataMessage={noDataMessage}
        columnMetadata={customColumnMetadata}
        externalLoadingComponent={Components.Loading}
      />
    );
  }

  render() {
    return (
      <div>
        <ButtonBar>
          <Button variant="contained" color="primary" onClick={this.handleShowCreateForm}>
            {"admin.tags.form.createNew"}
          </Button>
        </ButtonBar>

        <Card>
          <CardContent>
            {this.renderTable()}
          </CardContent>
        </Card>
      </div>
    );
  }
}

registerComponent("TagSettings", TagSettings, [
  withApollo,
  withRouter,
  withOpaqueShopId
]);

export default compose(
  withApollo,
  withRouter,
  withOpaqueShopId
)(TagSettings);
